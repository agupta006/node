// Consolidated arithmetic functions module
// Derived directly from workspace implementations in app.js

/**
 * Sums two numbers (original name in workspace: sum)
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sum(a, b) {
  return a + b;
}

/**
 * Multiplies two numbers (original name in workspace: multiply)
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function multiply(a, b) {
  return a * b;
}

/**
 * Subtracts second number from first (original name in workspace: substract)
 * Keeping original misspelled identifier for compatibility and adding alias.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function substract(a, b) {
  return a - b;
}

// Canonical aliases for consistency
const add = sum;
const subtract = substract;

module.exports = {
  // original names from workspace
  sum,
  multiply,
  substract,
  // canonical aliases
  add,
  subtract,
};
