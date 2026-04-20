function permutations(arr) {
    if (arr.length <= 1) return [arr];

    const hasil = [];

    for (let i = 0; i < arr.length; i++) {
        const elemen = arr[i];

        const sisanya = [...arr.slice(0, i), ...arr.slice(i + 1)];
        
        for (const perm of permutations(sisanya)) {
            hasil.push([elemen, ...perm]);
        }
    }
    return hasil;
}

function buildExpressions(nums) {
    if (nums.length === 1) {
        return [{ val: nums[0], expr: String(nums[0]), topOp: null }];
    }

    const operators = ['+', '-', '*'];
    const expressions = [];

    for (let i = 1; i < nums.length; i++) {
        const ekspresiKiri= buildExpressions(nums.slice(0, i));
        const ekspresiKanan = buildExpressions(nums.slice(i));

        for (const kiri of ekspresiKiri) {
            for (const kanan of ekspresiKanan) {
                for (const op of operators) {
                    let val;
                    if (op === '+') val = kiri.val + kanan.val;
                    else if (op === '-') val = kiri.val - kanan.val;
                    else val = kiri.val * kanan.val;

                    const prioritasRendah = (e) => e.topOp === '+' || e.topOp === '-';
                    const kurungKiri = (op === '*') && prioritasRendah(kiri);
                    const kurungKanan = (op === '*' || op === '-') && prioritasRendah(kanan);

                    const strKiri = kurungKiri ? `(${kiri.expr})` : kiri.expr;
                    const strKanan = kurungKanan ? `(${kanan.expr})` : kanan.expr;
                    
                    expressions.push({
                        val,
                        expr: `${strKiri} ${op} ${strKanan}`,
                        topOp: op
                    });
                }
            }
        }
    }

    return expressions;
}

function solve(source, target) {
    const solusi = new Set();

    for (const urutan of permutations(source)) {

        const semuaEkspresi = buildExpressions(urutan);
        for (const e of semuaEkspresi) {
            if (e.val === target) {
                solusi.add(e.expr);
            }
        }
    }
    return [...solusi];
}

console.log('=== Test 1 ===');
console.log('Source: [1, 4, 5, 6] | Target: 16');
const hasil1 = solve([1, 4, 5, 6], 16);
console.log('Solusi ditemukan:', hasil1.length);
console.log(hasil1);

console.log('\n=== Test 2 ===');
console.log('Source: [1, 4, 5, 6] | Target: 18');
const hasil2 = solve([1, 4, 5, 6], 18);
console.log('Solusi ditemukan:', hasil2.length);
console.log(hasil2);

console.log('\n=== Test 3 ===');
console.log('Source: [1, 4, 5, 6] | Target: 50');
const hasil3 = solve([1, 4, 5, 6], 50);
console.log('Solusi ditemukan:', hasil3.length);
console.log(hasil3);

console.log('\n=== Test 4 (dari perusahaan) ===');
console.log('Source: [2, 3, 5, 10] | Target: 25');
const hasil4 = solve([2, 3, 5, 10], 25);
console.log('Solusi ditemukan:', hasil4.length);
console.log(hasil4);