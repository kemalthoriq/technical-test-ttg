function findMissingNumbers(arr) {

    const min = Math.min(...arr);
    const max = Math.max(...arr);

    const angkaHilang = [];

    const angkaDiArray = new Set(arr);

    for (let i = min; i <= max; i++) {
        if (!angkaDiArray.has(i)) {
            angkaHilang.push(i);
        }
    }

    return angkaHilang;
}

// ===== TEST CASES =====

console.log('Test 1:', findMissingNumbers([3, 0, 2, 4]));
// Output: [1]

console.log('Test 2:', findMissingNumbers([3106, 3102, 3104, 3105, 3107]));
// Output: [3103]

console.log('Test 3:', findMissingNumbers([1, 2, 4, 6, 7, 10]));
// Output: [3, 5, 8, 9]

console.log('Test 4:', findMissingNumbers([100, 102, 105, 107]));
// Output: [101, 103, 104, 106]