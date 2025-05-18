import React, {useEffect, useState} from "react"
import styles from "./MatrixInput.module.css"
import {log} from "util"

type Props = {
    title: string
    words: string[]
    matrix: string[][]
    setMatrix: React.Dispatch<React.SetStateAction<string[][]>>
}

const MatrixInput = ({title, words, matrix, setMatrix}: Props) => {

    const [counter, setCounter] = useState(0)

    const handleChange = (row: number, col: number, rawValue: string) => {
        setCounter(prevState => prevState + 1)
        let value = rawValue.replace(",", ".")

        if (value.startsWith(".")) return

        if (/^\d*\.?\d*$/.test(value)) {
            const newMatrix = matrix.map((r, i) =>
                i === row ? r.map((c, j) => (j === col ? value : c)) : r
            )
            setMatrix(newMatrix)
        }
    }

    const recalculateMatrix = () => {
        const temp = matrix.map(r => [...r])


        for (let i = 0; i < matrix.length - 1; i++) {
            for (let j = i + 1; j < matrix.length; j++) {
                const value = 1 / +temp[i][j]
                if (Number.isFinite(value)) {
                    temp[j][i] = `${value.toFixed(2)}`
                } else {
                    temp[j][i] = '0'
                }
            }
        }

        return temp
    }


    useEffect(() => {
        setMatrix(recalculateMatrix())
    }, [counter])

    return (
        <div className={styles.wrapper}>
            <h3>{title}</h3>
            <div className={styles.topRow}>
                <div className={styles.corner}></div>
                {words.map((word, index) => (
                    <div key={index} className={styles.topWord}>
                        {word}
                    </div>
                ))}
            </div>

            <div className={styles.gridWithLabels}>
                {matrix.map((row, rowIndex) => (
                    <div key={rowIndex} className={styles.row}>
                        <div className={styles.leftWord}>{words[rowIndex]}</div>
                        {row.map((value, colIndex) => (
                            <input
                                key={`${rowIndex}-${colIndex}`}
                                type="text"
                                inputMode="decimal"
                                value={value}
                                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                                className={`
                                    ${styles.cell} 
                                    ${colIndex > rowIndex ? styles.green : ""} 
                                    ${colIndex < rowIndex ? styles.red : ""}
                                `}
                                disabled={colIndex <= rowIndex}
                            />

                        ))}
                    </div>
                ))}
            </div>
        </div>

    )
}

export default MatrixInput