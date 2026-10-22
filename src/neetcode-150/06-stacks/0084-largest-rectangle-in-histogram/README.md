# 0084. Largest Rectangle In Histogram

**Category:** `Stacks`  
**Difficulty:** 🔴 Hard  
**LeetCode Link:** [Largest Rectangle In Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)

---

## 📋 Problem Description

Given an array of integers `heights` representing the histogram's bar height where the width of each bar is `1`, return the area of the largest rectangle in the histogram.

**Example 1:**
```text
Input: heights = [2, 1, 5, 6, 2, 3]
Output: 10
Explanation: The largest rectangle is formed between indices 2 and 3 with height 5 and width 2 (Area = 5 * 2 = 10).
```

**Example 2:**
```text
Input: heights = [2, 4]
Output: 4
Explanation: The largest rectangle is formed by the bar of height 4 with width 1, or height 2 with width 2 (Area = 4).
```

**Constraints:**
- `1 <= heights.length <= 10^5`
- `0 <= heights[i] <= 10^4`

---

## 💡 Approach: Monotonic Stack (Optimal)

### Intuition

We want, for every bar, to know how wide it can stretch while still being the shortest bar in that rectangle.

A **monotonic stack** helps with this:
- We keep a stack of indices where the bar heights are in increasing order.
- As long as the next bar is taller or equal, we keep pushing indices.
- When we see a shorter bar, it means the bar on top of the stack can't extend further to the right:
  - We pop it and treat it as the height of a rectangle.
  - Its width goes from the new top of the stack $+ 1$ up to the current index $- 1$ (`width = i - stack[top] - 1`).
- To make sure every bar eventually gets popped and processed, we run the loop one extra step (`i = n`) with a "virtual" bar of height 0 at the end.
- Each bar is pushed and popped at most once, so this approach is both optimal and clean.

### Algorithm

1. **Initialize:**
   - `maxArea = 0`
   - An empty stack `stack: number[]` to store indices of bars (with heights in increasing order).
2. **Loop `i` from `0` to `n` (inclusive):**
   - While the stack is not empty and either:
     - `i === n` (we're past the last bar, acting like height 0), or
     - `heights[stack[stack.length - 1]] >= heights[i]` (current bar is shorter than or equal to the top bar):
       - Pop the top index: `poppedIndex = stack.pop()!`.
       - Let its height be `height = heights[poppedIndex]`.
       - Compute width:
         - If stack is empty: `width = i` (no smaller bar on left; extends from `0` to `i - 1`).
         - Otherwise: `width = i - stack[stack.length - 1] - 1`.
       - Update `maxArea = Math.max(maxArea, height * width)`.
   - Push current index `i` onto the stack.
3. **Return:**
   - After the loop, `maxArea` holds the largest rectangle area.

---

## 🔍 Code Tracing & Detailed Walkthrough

### Code with Inline Trace Annotations

```typescript
class Solution {
  largestRectangleArea(heights: number[]): number {
    const n: number = heights.length; // e.g., 6
    let maxArea: number = 0;
    const stack: number[] = []; // Stores indices, not heights

    // Example:
    // heights = [2, 1, 5, 6, 2, 3]
    // indices = [0, 1, 2, 3, 4, 5]

    // i <= n means i goes from 0 through 6.
    // i = 6 is an extra iteration to process remaining bars.
    for (let i = 0; i <= n; i++) {
      // Keep popping while:
      // 1. The stack is not empty, AND
      // 2. Current height <= height at the top index (or i === n sentinel).
      //
      // Example at i = 1:
      // heights[i] = 1, Top index = 0 (height = 2)
      // 2 >= 1 is true -> pop index 0.
      //
      // At i = 4:
      // Current height = 2
      // Top height = 6 -> pop
      // New top height = 5 -> pop
      // New top height = 1 -> stop (1 >= 2 is false).
      //
      // At i = n (6):
      // The condition (i === n) is true, popping all remaining bars.
      while (
        stack.length > 0 &&
        (i === n || heights[stack[stack.length - 1]] >= heights[i])
      ) {
        // Remove the top INDEX and retrieve its height.
        const poppedIndex: number = stack.pop()!;
        const height: number = heights[poppedIndex];

        // Calculate width using boundaries:
        // Left boundary: stack[stack.length - 1] (exclusive)
        // Right boundary: i (exclusive)
        let width: number;
        if (stack.length === 0) {
          // No smaller bar exists on the left.
          // Rectangle extends from index 0 to i - 1.
          width = i;
        } else {
          width = i - stack[stack.length - 1] - 1;
        }

        const area: number = height * width;
        maxArea = Math.max(maxArea, area);
      }

      // Push current index after popping taller bars.
      stack.push(i);
    }

    return maxArea;
  }
}
```

### Step-by-Step Execution Trace

Given `heights = [2, 1, 5, 6, 2, 3]`, $n = 6$:

| Step | `i` | `heights[i]` | Stack Before Pop | Popped Index | Height $h$ | Left Boundary (`stack.top()`) | Width Formula | Width $w$ | Area ($h \times w$) | `maxArea` | Stack After Push |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | 0 | 2 | `[]` | — | — | — | — | — | — | 0 | `[0]` |
| 2 | 1 | 1 | `[0]` | 0 | 2 | None (empty) | `i = 1` | 1 | $2 \times 1 = 2$ | **2** | — |
| 3 | 1 | 1 | `[]` | — | — | — | — | — | — | 2 | `[1]` |
| 4 | 2 | 5 | `[1]` | — | — | — | — | — | — | 2 | `[1, 2]` |
| 5 | 3 | 6 | `[1, 2]` | — | — | — | — | — | — | 2 | `[1, 2, 3]` |
| 6 | 4 | 2 | `[1, 2, 3]` | 3 | 6 | 2 | $4 - 2 - 1$ | 1 | $6 \times 1 = 6$ | **6** | — |
| 7 | 4 | 2 | `[1, 2]` | 2 | 5 | 1 | $4 - 1 - 1$ | 2 | $5 \times 2 = 10$ | **10** | — |
| 8 | 4 | 2 | `[1]` | Stop: $heights[1] = 1 < 2$ | — | — | — | — | — | 10 | `[1, 4]` |
| 9 | 5 | 3 | `[1, 4]` | — | — | — | — | — | — | 10 | `[1, 4, 5]` |
| 10 | 6 (end) | Sentinel (0) | `[1, 4, 5]` | 5 | 3 | 4 | $6 - 4 - 1$ | 1 | $3 \times 1 = 3$ | 10 | — |
| 11 | 6 (end) | Sentinel (0) | `[1, 4]` | 4 | 2 | 1 | $6 - 1 - 1$ | 4 | $2 \times 4 = 8$ | 10 | — |
| 12 | 6 (end) | Sentinel (0) | `[1]` | 1 | 1 | None (empty) | `i = 6` | 6 | $1 \times 6 = 6$ | 10 | — |
| 13 | 6 (end) | — | `[]` | — | — | — | — | — | — | 10 | `[6]` |

**Final Result:** `maxArea = 10`

---

## 🎯 Solution

### Implementation

```typescript
export class Solution {
  largestRectangleArea(heights: number[]): number {
    const n: number = heights.length;
    let maxArea: number = 0;
    const stack: number[] = [];

    for (let i = 0; i <= n; i++) {
      while (
        stack.length > 0 &&
        (i === n || heights[stack[stack.length - 1]] >= heights[i])
      ) {
        const poppedIndex = stack.pop()!;
        const height = heights[poppedIndex];
        const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;

        maxArea = Math.max(maxArea, height * width);
      }

      stack.push(i);
    }

    return maxArea;
  }
}

export function largestRectangleInHistogram(heights: number[]): number {
  return new Solution().largestRectangleArea(heights);
}

export function largestRectangleArea(heights: number[]): number {
  return new Solution().largestRectangleArea(heights);
}
```

---

## 📊 Complexity Analysis

| Metric | Complexity | Explanation |
|--------|-----------|-------------|
| **Time** | $O(n)$ | Each bar index is pushed onto the stack exactly once and popped at most once. All stack operations are $O(1)$. |
| **Space** | $O(n)$ | In the worst case (e.g., strictly ascending heights), the monotonic stack stores up to $n$ indices. |

---

## ⚠️ Common Pitfalls

1. **Off-by-One Errors in Width Calculation:**  
   When computing the width of a rectangle, it is easy to miscalculate the boundaries. The width must be `right - left - 1` where `left` and `right` are indices of the nearest smaller bars (exclusive boundaries). Forgetting to subtract `1` or using inclusive boundaries incorrectly leads to erroneous area calculations.

2. **Forgetting to Process Remaining Stack Elements:**  
   After iterating through all bars, the stack may still contain indices of bars that never encountered a shorter bar to their right. These bars can extend all the way to the end of the histogram. Using `i = n` as an extra iteration step acts like a virtual bar of height 0, ensuring all remaining elements are popped and evaluated.

3. **Using Strict vs Non-Strict Inequality:**  
   When comparing heights to decide whether to pop from the stack, using `>` versus `>=` matters. Using strict greater-than (`>`) may cause duplicate bars of equal height to remain on the stack unnecessarily, complicating left boundary calculations. Using `>=` cleanly handles equal height bars.

4. **Incorrect Handling of Empty Stack:**  
   When the stack becomes empty after popping, it means there is no smaller bar to the left. The rectangle extends all the way from index `0` to `i - 1`, making `width = i`. Accessing `stack[stack.length - 1]` on an empty stack leads to `undefined` or runtime errors if not guarded.

5. **Not Handling Single-Element or Uniform Arrays:**  
   Edge cases like arrays with a single bar (e.g., `[2]`) or all bars with identical heights require correct handling. The algorithm must correctly return the bar height for single elements or `height * length` for uniform bars without special-case branching.

---

## ✅ Testing & Verification

### Test Cases
- [x] Example 1: `heights = [2, 1, 5, 6, 2, 3]` -> `10`
- [x] Example 2: `heights = [2, 4]` -> `4`
- [x] Single element: `heights = [5]` -> `5`
- [x] All equal heights: `heights = [3, 3, 3, 3]` -> `12`
- [x] Monotonically increasing: `heights = [1, 2, 3, 4, 5]` -> `9`
- [x] Monotonically decreasing: `heights = [5, 4, 3, 2, 1]` -> `9`
- [x] Histogram with 0 heights: `heights = [0, 9]` -> `9`

---

## 🏷️ Tags

`stacks` • `monotonic-stack` • `leetcode-0084` • `typescript`

---

**Status:** ✅ Completed  
**Date Started:** 2026-10-22  
**Last Updated:** 2026-10-22
