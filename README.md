# DSA Prep — Professional TypeScript Development Environment

A meticulously crafted, zero-friction Data Structures & Algorithms (DSA) learning platform with seamless automation across multiple NeetCode roadmaps.

---

## Table of Contents

- [Overview](#overview)
- [Repository Architecture](#repository-architecture)
- [Quick Start](#quick-start)
- [Commands & Usage](#commands--usage)
- [Roadmap Structure](#roadmap-structure)
- [Progress Tracking](#progress-tracking)
- [Development Setup](#development-setup)

---

## Overview

This repository provides a **professional-grade TypeScript DSA learning environment** with intelligent automation for problem generation across four comprehensive NeetCode roadmaps:

| Roadmap | Problems | Focus |
|---------|----------|-------|
| **NeetCode 75** | 75 core problems | Foundational DSA mastery |
| **NeetCode 150** | 150 problems | Intermediate & advanced patterns |
| **NeetCode 250** | 250 problems | Exhaustive pattern coverage |
| **NeetCode All** | Complete collection | Comprehensive deep dive |

### Key Features

- **Automated Problem Generation** — Generate fully templated problem directories with one command
- **Organized Structure** — Hierarchical organization by roadmap, category, and problem
- **Rich Documentation** — Pre-formatted README templates with complexity analysis
- **TypeScript Support** — Full type safety, strict mode enabled
- **Zero Configuration** — Works out of the box with sensible defaults
- **Beautiful CLI** — Colorized terminal output with intuitive feedback

---

## Repository Architecture

```
dsa-prep/
├── src/
│   ├── neetcode-75/           # Blind 75 curated problems
│   ├── neetcode-150/          # Extended 150-problem set
│   ├── neetcode-250/          # Comprehensive 250-problem set
│   └── neetcode-all/          # Complete NeetCode collection
│
├── dist/                       # Compiled TypeScript output
├── node_modules/               # Dependencies
│
├── create-problem.js           # Automation engine
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project metadata & scripts
├── package-lock.json           # Dependency lock file
└── README.md                   # This file
```

### Directory Organization Pattern

Each roadmap follows a consistent structure:

```
src/<roadmap>/
├── <topic-category>/
│   └── <problem-slug>/
│       ├── solution.ts         # Implementation file
│       └── README.md           # Problem documentation
```

**Example structure for Two Sum problem:**
```
src/neetcode-150/01-arrays-and-hashing/0001-two-sum/
├── solution.ts
└── README.md
```

---

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Your First Problem

```bash
npm run new neetcode-150 01-arrays-and-hashing 0001-two-sum
```

### 3. Start Solving

```bash
# Open the generated files
open src/neetcode-150/01-arrays-and-hashing/0001-two-sum/solution.ts
open src/neetcode-150/01-arrays-and-hashing/0001-two-sum/README.md
```

---

## Commands & Usage

### Create a New Problem

**Command Format:**
```bash
npm run new <roadmap> <topic-category> <problem-slug>
```

**Parameters:**

| Parameter | Description | Example |
|-----------|-------------|---------|
| `<roadmap>` | Target NeetCode list (must be exact) | `neetcode-150` |
| `<topic-category>` | Topic grouping with leading number | `01-arrays-and-hashing` |
| `<problem-slug>` | Problem identifier with number prefix | `0001-two-sum` |

**Valid Roadmaps:**
- `neetcode-75`
- `neetcode-150`
- `neetcode-250`
- `neetcode-all`

### Usage Examples

#### Arrays & Hashing (NeetCode 150)
```bash
npm run new neetcode-150 01-arrays-and-hashing 0001-two-sum
npm run new neetcode-150 01-arrays-and-hashing 0002-valid-anagram
npm run new neetcode-150 01-arrays-and-hashing 0242-contains-duplicate
```

#### Two Pointers (NeetCode 75)
```bash
npm run new neetcode-75 02-two-pointers 0011-container-with-most-water
npm run new neetcode-75 02-two-pointers 0125-valid-palindrome
```

#### Trees (NeetCode 250)
```bash
npm run new neetcode-250 07-trees 0100-same-tree
npm run new neetcode-250 07-trees 0226-invert-binary-tree
```

#### Dynamic Programming (NeetCode All)
```bash
npm run new neetcode-all 08-dynamic-programming 0070-climbing-stairs
npm run new neetcode-all 08-dynamic-programming 0198-house-robber
```

### Error Handling

The script provides helpful error messages:

```bash
# Invalid roadmap
npm run new invalid-roadmap 01-arrays 0001-two-sum
# ERROR: Invalid roadmap: "invalid-roadmap"
# Allowed roadmaps:
#   - neetcode-75
#   - neetcode-150
#   - neetcode-250
#   - neetcode-all

# Problem already exists
npm run new neetcode-150 01-arrays 0001-two-sum
# (when directory already exists)
# ERROR: Problem already exists at: src/neetcode-150/01-arrays-and-hashing/0001-two-sum/
# If you want to recreate it, delete the directory first.

# Missing arguments
npm run new neetcode-150 01-arrays
# ERROR: Invalid number of arguments!
# Usage:
#   npm run new <roadmap> <topic-category> <problem-slug>
```

---

## Generated Files

### solution.ts

Template structure with type safety and documentation:

```typescript
/**
 * Problem: Two Sum
 * LeetCode: https://leetcode.com/problems/two-sum/
 *
 * @timeComplexity O(?) - TODO: Analyze and update
 * @spaceComplexity O(?) - TODO: Analyze and update
 */

export function twoSum(/* TODO: Add parameters */): /* TODO: Add return type */ {
  // TODO: Implement solution
  throw new Error('Not implemented');
}

// Alternative solutions or helper functions below:
```

### README.md

Comprehensive documentation template featuring:

- Problem title and LeetCode link
- Difficulty indicator (Easy/Medium/Hard)
- Problem description section
- Multiple example cases
- Constraints listing
- Algorithm approach breakdown
- Key insights documentation
- Step-by-step algorithm walkthrough
- Complexity analysis matrix (LaTeX formatted)
- Test case tracking checklist
- Alternative approaches comparison
- Notes & learnings section
- Problem tags
- Status tracking
- Timestamps (start date, last updated)

**Example complexity matrix:**
```markdown
| Metric | Complexity | Explanation |
|--------|-----------|-------------|
| **Time** | $O(n^2)$ | Two nested loops over input |
| **Space** | $O(1)$ | Only using constant extra space |
```

---

## Progress Tracking

### Status Markers

Use these in your README.md files to track progress:

- **In Progress** — Currently working on
- **Completed** — Solution verified and optimized
- **Needs Review** — Completed but needs verification

### Tracking Metrics

Monitor your learning journey:

```bash
# Count problems by roadmap
find src/neetcode-150 -name "solution.ts" | wc -l

# Find all completed problems
grep -r "Status: Completed" src/ | wc -l

# Find problems needing review
grep -r "Status: Needs Review" src/ | wc -l

# List all categories
ls src/neetcode-150/
```

---

## Development Setup

### System Requirements

- **Node.js** ≥ 18.0.0
- **npm** ≥ 8.0.0
- **TypeScript** knowledge (basic)

### TypeScript Configuration

The `tsconfig.json` is configured for modern development:

```json
{
  "compilerOptions": {
    "target": "ES2022",           // Modern JavaScript output
    "module": "CommonJS",         // Node.js compatible modules
    "strict": true,               // Full type safety
    "esModuleInterop": true,      // Better module interop
    "skipLibCheck": true,         // Faster compilation
    "lib": ["ES2022"],            // Latest JavaScript features
    "outDir": "./dist",           // Compiled output location
    "rootDir": "./src"            // Source directory
  }
}
```

### Building & Compilation

```bash
# Compile TypeScript
npx tsc

# Watch mode for development
npx tsc --watch

# Compile and run a specific file
npx ts-node src/neetcode-150/01-arrays-and-hashing/0001-two-sum/solution.ts
```

### Project Structure Benefits

| Benefit | Details |
|---------|---------|
| **Scalability** | Roadmap-based organization grows with your progress |
| **Discoverability** | Topic categories make navigation intuitive |
| **Maintainability** | Each problem is self-contained and modular |
| **Learning** | Hierarchical structure mirrors concept progression |
| **Collaboration** | Clear conventions make team contributions effortless |

---

## Best Practices

### Problem-Solving Workflow

1. **Create** → `npm run new <roadmap> <category> <problem-slug>`
2. **Read** → Review problem description in README.md
3. **Plan** → Document approach and complexity
4. **Implement** → Write solution in solution.ts
5. **Test** → Verify with example cases
6. **Optimize** → Explore alternative approaches
7. **Document** → Update README with learnings
8. **Mark** → Update status to Completed

### Documentation Tips

- Keep problem descriptions concise
- Provide multiple solution approaches
- Use LaTeX notation for Big-O complexity (`$O(n)$`)
- Include edge case examples
- Link related problems
- Document key insights for future reference

### TypeScript Conventions

- Use **strict mode** for type safety
- Provide explicit return types
- Export functions for testability
- Use descriptive variable names
- Add JSDoc comments for complex logic

---

## Metrics & Analytics

Track your progress with simple shell commands:

```bash
# Total problems created
find src -name "solution.ts" | wc -l

# Problems per roadmap
for dir in src/neetcode-*; do echo "$(basename $dir): $(find $dir -name 'solution.ts' | wc -l)"; done

# Completion rate
echo "Completed: $(grep -r 'Status: Completed' src | wc -l)"
echo "In Progress: $(grep -r 'Status: In Progress' src | wc -l)"
echo "Needs Review: $(grep -r 'Status: Needs Review' src | wc -l)"
```

---

## Learning Resources

### NeetCode Platforms
- [NeetCode.io](https://neetcode.io) — Interactive platform with video explanations
- [LeetCode](https://leetcode.com) — Original problem source
- [NeetCode GitHub](https://github.com/neetcode-gh) — Official repository

### TypeScript Resources
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) — Official documentation
- [Advanced TypeScript](https://www.typescriptlang.org/docs/handbook/advanced-types.html) — Advanced patterns

### DSA Concepts
- Big-O Notation and Complexity Analysis
- Data Structures (Arrays, Linked Lists, Trees, Graphs)
- Algorithms (Sorting, Searching, Dynamic Programming)
- Problem-Solving Patterns

---

## Contributing

To extend this environment:

1. **New roadmaps** — Add directory to `src/`
2. **Custom templates** — Modify generator functions in `create-problem.js`
3. **Automation** — Add build/test scripts to `package.json`

---

## License

ISC License — Feel free to use for personal or professional learning.

---

## Support & Feedback

For issues or improvements:
1. Check existing documentation
2. Review `create-problem.js` for automation details
3. Validate TypeScript configuration in `tsconfig.json`

---

## Next Steps

```bash
# 1. Install dependencies
npm install

# 2. Create your first problem
npm run new neetcode-150 01-arrays-and-hashing 0001-two-sum

# 3. Start solving!
cd src/neetcode-150/01-arrays-and-hashing/0001-two-sum/
```

---

**Happy problem-solving!**

Last Updated: 2026-10-05
