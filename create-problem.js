#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const ALLOWED_ROADMAPS = ['neetcode-75', 'neetcode-150', 'neetcode-250', 'neetcode-all'];
const SRC_DIR = path.join(__dirname, 'src');

// ANSI color codes for beautiful terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logError(message) {
  log(`❌ ERROR: ${message}`, 'red');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'cyan');
}

// Convert kebab-case problem slug to camelCase function name
function slugToCamelCase(slug) {
  // Remove leading numbers and hyphens (e.g., "0001-two-sum" -> "two-sum")
  const withoutNumbers = slug.replace(/^\d+-/, '');

  // Split by hyphens and convert to camelCase
  const parts = withoutNumbers.split('-');
  return parts[0] + parts.slice(1).map(part =>
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join('');
}

// Extract problem number from slug
function extractProblemNumber(slug) {
  const match = slug.match(/^(\d+)-/);
  return match ? match[1] : '0000';
}

// Convert slug to title case
function slugToTitle(slug) {
  const withoutNumbers = slug.replace(/^\d+-/, '');
  return withoutNumbers
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Generate solution.ts template
function generateSolutionTemplate(functionName, problemSlug) {
  return `/**
 * Problem: ${slugToTitle(problemSlug)}
 * LeetCode: https://leetcode.com/problems/${problemSlug.replace(/^\d+-/, '')}/
 *
 * @timeComplexity O(?) - TODO: Analyze and update
 * @spaceComplexity O(?) - TODO: Analyze and update
 */

export function ${functionName}(/* TODO: Add parameters */): /* TODO: Add return type */ {
  // TODO: Implement solution
  throw new Error('Not implemented');
}

// Alternative solutions or helper functions below:
`;
}

// Generate README.md template
function generateReadmeTemplate(problemSlug, functionName, topicCategory) {
  const problemNumber = extractProblemNumber(problemSlug);
  const problemTitle = slugToTitle(problemSlug);
  const leetcodeUrl = `https://leetcode.com/problems/${problemSlug.replace(/^\d+-/, '')}/`;

  return `# ${problemNumber}. ${problemTitle}

**Category:** \`${topicCategory.replace(/^\d+-/, '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}\`
**Difficulty:** 🟢 Easy | 🟡 Medium | 🔴 Hard
**LeetCode Link:** [${problemTitle}](${leetcodeUrl})

---

## 📋 Problem Description

<!-- Paste the problem description here -->

**Example 1:**
\`\`\`
Input:
Output:
Explanation:
\`\`\`

**Example 2:**
\`\`\`
Input:
Output:
Explanation:
\`\`\`

**Constraints:**
-

---

## 💡 Approach

### Strategy
<!-- Describe your approach here -->

### Key Insights
-
-
-

### Algorithm Steps
1.
2.
3.
4.

---

## 🎯 Solution

### Implementation
\`\`\`typescript
// See solution.ts for full implementation
export function ${functionName}(/* params */): /* return type */ {
  // Implementation
}
\`\`\`

---

## 📊 Complexity Analysis

| Metric | Complexity | Explanation |
|--------|-----------|-------------|
| **Time** | $O(?)$ | <!-- Explain time complexity --> |
| **Space** | $O(?)$ | <!-- Explain space complexity --> |

---

## ✅ Testing & Verification

### Test Cases
- [ ] Example 1 passes
- [ ] Example 2 passes
- [ ] Edge case: Empty input
- [ ] Edge case: Single element
- [ ] Edge case: Large input
- [ ] Edge case: Negative numbers (if applicable)

### Manual Testing
\`\`\`bash
# Run the solution
npm run test
\`\`\`

---

## 🔄 Optimization Notes

### Current Solution
- **Pros:**
- **Cons:**

### Alternative Approaches
1. **Approach 2:**
   - Time: $O(?)$
   - Space: $O(?)$
   - Trade-offs:

---

## 📝 Notes & Learnings

<!-- Document insights, patterns, and lessons learned -->

---

## 🏷️ Tags

\`${topicCategory.replace(/^\d+-/, '')}\` • \`leetcode-${problemNumber}\` • \`typescript\`

---

**Status:** 🚧 In Progress | ✅ Completed | 🔄 Needs Review
**Date Started:** ${new Date().toISOString().split('T')[0]}
**Last Updated:** ${new Date().toISOString().split('T')[0]}
`;
}

// Main execution
function main() {
  const args = process.argv.slice(2);

  if (args.length !== 3) {
    logError('Invalid number of arguments!');
    log('\n📖 Usage:', 'bright');
    log('  npm run new <roadmap> <topic-category> <problem-slug>\n', 'yellow');
    log('📌 Example:', 'bright');
    log('  npm run new neetcode-150 01-arrays-and-hashing 0001-two-sum\n', 'cyan');
    log('✨ Available roadmaps:', 'bright');
    ALLOWED_ROADMAPS.forEach(rm => log(`  • ${rm}`, 'green'));
    process.exit(1);
  }

  const [roadmap, topicCategory, problemSlug] = args;

  // Validate roadmap
  if (!ALLOWED_ROADMAPS.includes(roadmap)) {
    logError(`Invalid roadmap: "${roadmap}"`);
    log('\n✨ Allowed roadmaps:', 'bright');
    ALLOWED_ROADMAPS.forEach(rm => log(`  • ${rm}`, 'green'));
    process.exit(1);
  }

  // Validate inputs
  if (!topicCategory || !problemSlug) {
    logError('Topic category and problem slug cannot be empty!');
    process.exit(1);
  }

  // Build directory path
  const problemDir = path.join(SRC_DIR, roadmap, topicCategory, problemSlug);
  const solutionPath = path.join(problemDir, 'solution.ts');
  const readmePath = path.join(problemDir, 'README.md');

  // Check if problem already exists
  if (fs.existsSync(problemDir)) {
    logError(`Problem already exists at: ${problemDir}`);
    log('\n💡 If you want to recreate it, delete the directory first.', 'yellow');
    process.exit(1);
  }

  // Create directory structure
  logInfo('Creating directory structure...');
  fs.mkdirSync(problemDir, { recursive: true });
  logSuccess(`Created: ${problemDir}`);

  // Generate function name
  const functionName = slugToCamelCase(problemSlug);

  // Create solution.ts
  logInfo('Generating solution.ts...');
  fs.writeFileSync(solutionPath, generateSolutionTemplate(functionName, problemSlug));
  logSuccess(`Created: ${solutionPath}`);

  // Create README.md
  logInfo('Generating README.md...');
  fs.writeFileSync(readmePath, generateReadmeTemplate(problemSlug, functionName, topicCategory));
  logSuccess(`Created: ${readmePath}`);

  // Success summary
  log('\n' + '='.repeat(60), 'green');
  log('🎉 Problem setup completed successfully!', 'green');
  log('='.repeat(60), 'green');
  log(`\n📂 Location: ${problemDir.replace(__dirname + '/', '')}`, 'cyan');
  log(`📝 Function: ${functionName}()`, 'cyan');
  log(`🔗 Files created:`, 'bright');
  log(`   • solution.ts`, 'green');
  log(`   • README.md`, 'green');
  log(`\n💻 Next steps:`, 'bright');
  log(`   1. Open ${problemSlug}/solution.ts`, 'yellow');
  log(`   2. Implement the ${functionName}() function`, 'yellow');
  log(`   3. Update README.md with problem details`, 'yellow');
  log(`   4. Add test cases and verify solution\n`, 'yellow');
}

// Execute
main();
