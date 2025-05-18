import React, {useState} from "react"

const MatrixInput: React.FC = () => {
    const [matrix, setMatrix] = useState<string[][]>(
        Array(4).fill(Array(4).fill(""))
    )

    const handleChange = (row: number, col: number, value: string) => {
        const newMatrix = matrix.map((r, i) =>
            i === row ? r.map((c, j) => (j === col ? value : c)) : r
        )
        setMatrix(newMatrix)
    }

    return (
        <div className="grid grid-cols-4 gap-2">
            {matrix.map((row, rowIndex) =>
                row.map((value, colIndex) => (
                    <input
                        key={`${rowIndex}-${colIndex}`}
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                        className="w-16 h-10 border rounded text-center"
                    />
                ))
            )}
        </div>
    )
}

export default MatrixInput
