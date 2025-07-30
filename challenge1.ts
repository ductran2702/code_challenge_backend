/**
 * Three unique implementations of sum_to_n function
 * Input: n - any integer
 * Output: summation from 1 to n
 * Assumption: result will always be less than Number.MAX_SAFE_INTEGER
 */

/**
 * Implementation A: Iterative approach
 * - Time Complexity: O(n) - Linear time as it iterates through each number from 1 to n
 * - Space Complexity: O(1) - Constant space, only uses a single variable
 * - Pros: Simple to understand, works for any positive integer
 * - Cons: Less efficient for large values of n
 */
function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Implementation B (Mathematical Formula):
 * - Time Complexity: O(1) - Constant time, single arithmetic operation
 * - Space Complexity: O(1) - Constant space
 * - Pros: Most efficient, fastest execution time
 * - Cons: Requires understanding of mathematical formula, may not be intuitive
 */
function sum_to_n_b(n: number): number {
    return (n * (n + 1)) / 2;
}

/**
 * Implementation C: Recursive approach
 * - Time Complexity: O(n) - Linear time due to n recursive calls
 * - Space Complexity: O(n) - Linear space due to call stack depth
 * - Pros: Elegant mathematical representation, easy to understand logic
 * - Cons: Stack overflow risk for large n, less efficient than iterative approach
 */
function sum_to_n_c(n: number): number {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    return n + sum_to_n_c(n - 1);
}

// Test cases
console.log("Testing all implementations:");
console.log("sum_to_n_a(5):", sum_to_n_a(5)); // Expected: 15
console.log("sum_to_n_b(5):", sum_to_n_b(5)); // Expected: 15
console.log("sum_to_n_c(5):", sum_to_n_c(5)); // Expected: 15

console.log("sum_to_n_a(10):", sum_to_n_a(10)); // Expected: 55
console.log("sum_to_n_b(10):", sum_to_n_b(10)); // Expected: 55
console.log("sum_to_n_c(10):", sum_to_n_c(10)); // Expected: 55
