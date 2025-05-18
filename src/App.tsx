import React, {useEffect, useState} from 'react'
import styles from "./App.module.css"
import MatrixInput from "./components/MatrixInput/MatrixInput"
import CriterionInput from "./components/CriterionInput/CriterionInput"
import calc from "./utils/calc"
import Res from "./components/Res/Res"

function App() {
    const [step, setStep] = useState(0)
    const [criteria, setCriteria] = useState<string[]>(Array(4).fill(""))
    const [analogs, setAnalogs] = useState<string[]>(Array(3).fill(""))
    const [res, setRes] = useState<number[][]>([])

    const createInitialMatrix = (size: number): string[][] => {
        return Array(size)
            .fill(null)
            .map((_, i) =>
                Array(size)
                    .fill("0")
                    .map((_, j) => (i === j ? "1" : "0"))
            )
    }
    const [initialMatrix, setInitialMatrix] = useState(createInitialMatrix(4))
    const [criterionMatrix1, setCriterionMatrix1] = useState(createInitialMatrix(3))
    const [criterionMatrix2, setCriterionMatrix2] = useState(createInitialMatrix(3))
    const [criterionMatrix3, setCriterionMatrix3] = useState(createInitialMatrix(3))
    const [criterionMatrix4, setCriterionMatrix4] = useState(createInitialMatrix(3))

    useEffect(() => {

            setRes(calc(initialMatrix, criterionMatrix1, criterionMatrix2, criterionMatrix3, criterionMatrix4))

    }, [step])


    return (
        <div className={styles.App}>
            {step === 0 &&
                <CriterionInput
                    words={criteria}
                    setWords={setCriteria}
                    title={'Введите критерии'}
                    placeholder={'Критерий'}
                />
            }
            {step === 1 &&
                <MatrixInput
                    title={'Введите матрицу'}
                    words={criteria}
                    matrix={initialMatrix}
                    setMatrix={setInitialMatrix}
                />
            }
            {step === 2 &&
                <CriterionInput
                    words={analogs}
                    setWords={setAnalogs}
                    title={'Введите аналоги'}
                    placeholder={'Аналог'}
                />
            }
            {step === 3 &&
                <MatrixInput
                    matrix={criterionMatrix1}
                    setMatrix={setCriterionMatrix1}
                    title={`Введите матрицу для критерия: ${criteria[0]}`}
                    words={analogs}
                />
            }
            {step === 4 &&
                <MatrixInput
                    matrix={criterionMatrix2}
                    setMatrix={setCriterionMatrix2}
                    title={`Введите матрицу для критерия: ${criteria[1]}`}
                    words={analogs}
                />
            }
            {step === 5 &&
                <MatrixInput
                    matrix={criterionMatrix3}
                    setMatrix={setCriterionMatrix3}
                    title={`Введите матрицу для критерия: ${criteria[2]}`}
                    words={analogs}
                />
            }
            {step === 6 &&
                <MatrixInput
                    matrix={criterionMatrix4}
                    setMatrix={setCriterionMatrix4}
                    title={`Введите матрицу для критерия: ${criteria[3]}`}
                    words={analogs}/>
            }
            {step === 7 &&
                <Res
                    matrix={res}
                    criteria={criteria}
                    analogs={analogs}
                />
            }
            {
                step < 7 &&
                <div className={styles.buttons}>
                    <button
                        onClick={() => setStep(prevState => prevState- 1)}
                        className={styles.nextButton}
                    >
                        Назад
                    </button>
                    <button
                        onClick={() => setStep(prevState => prevState + 1)}
                        className={styles.nextButton}
                    >
                        Далее
                    </button>
                </div>

            }
        </div>
    )
}

export default App
