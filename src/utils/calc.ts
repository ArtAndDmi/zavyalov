const convertToNum = (matrix: string[][]) => matrix.map(row => row.map(cell => +cell))

export default function calc(initialMatrix: string[][], criterionMatrix1: string[][], criterionMatrix2: string[][], criterionMatrix3: string[][], criterionMatrix4: string[][]) {
    const initial = convertToNum(initialMatrix)
    const c1 = convertToNum(criterionMatrix1)
    const c2 = convertToNum(criterionMatrix2)
    const c3 = convertToNum(criterionMatrix3)
    const c4 = convertToNum(criterionMatrix4)

    console.log(`
    ПРЕОБРАЗОВАНИЕ В NUM
    ${initial}
    ${c1}
    ${c2}
    ${c3}
    ${c4}
    `)

    const top = step1(initial)
    const bottom = transposeMatrix([step2(c1), step2(c2), step2(c3), step2(c4)])

    const bottomRes = step3(top, bottom)

    console.log(`
    BOTTOM_RES
    ${bottomRes}
    `)

    console.log(`
    RES3
    ${[
        ...top,
        ...bottomRes
    ]}
    `)

    return [
        top,
        ...bottomRes
    ]
}


function step1(matrix: number[][]): number[] {
    const rootedSums = matrix.map(row => {
        const rowSum = row.reduce((sum, value) => sum + value, 0)
        return Math.pow(rowSum, 0.25)
    })

    const total = rootedSums.reduce((sum, val) => sum + val, 0)

    if (total === 0) {
        throw new Error("Сумма всех преобразованных строк равна 0.")
    }
    console.log(`
    STEP1
    ${rootedSums.map(val => val / total)}
    `)
    const res = rootedSums.map(val => val / total)
    res.push(-1)
    return res
}

function step2(m: number[][]) {
    const c2 = m[0][1]
    const d2 = m[0][2]
    const d3 = m[1][2]
    const i2 = Math.pow((c2 * d3 / d2), 1 / 3)

    console.log(`
    STEP2
    ${[
        d2 * i2 / (1 + d2 * i2 + d3 / i2),
        d3 / (i2 * (1 + d2 * i2 + d3 / i2)),
        1 / (1 + d2 * i2 + d3 / i2)
    ]}
    `)

    return [
        d2 * i2 / (1 + d2 * i2 + d3 / i2),
        d3 / (i2 * (1 + d2 * i2 + d3 / i2)),
        1 / (1 + d2 * i2 + d3 / i2)
    ]

}

function step3(top: number[], bottom: number[][]): number[][] {
    return bottom.map((row, i) => {
        const dotProduct = row.reduce((sum, value, index) => sum + value * top[index], 0)
        return [...row, dotProduct]
    })
}


function transposeMatrix<T>(matrix: T[][]): T[][] {
    if (matrix.length === 0) return []
    const colCount = matrix[0].length

    return Array.from({length: colCount}, (_, colIndex) =>
        matrix.map(row => row[colIndex])
    )
}



