/**
 * Problem: Largest Rectangle In Histogram
 * LeetCode: https://leetcode.com/problems/largest-rectangle-in-histogram/
 *
 * @timeComplexity O(n) - Each bar is pushed and popped at most once
 * @spaceComplexity O(n) - Monotonic stack can store up to n elements
 */

export class Solution {
  largestRectangleArea(heights: number[]): number {
    const n: number = heights.length;
    let maxArea: number = 0;
    const stack: number[] = []; // Stores indices of heights in increasing order

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
