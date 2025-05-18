import React, {useState} from 'react'
import styles from './CriterionInput.module.css'

interface Props {
    words: string[]
    setWords: React.Dispatch<React.SetStateAction<string[]>>
    title: string
    placeholder: string
}

export const CriterionInput: React.FC<Props> = ({words, setWords, title, placeholder}: Props) => {

    const handleChange = (index: number, value: string) => {
        const newWords = [...words]
        newWords[index] = value
        setWords(newWords)
    }

    return (
        <div className={styles.container}>
            <h3>{title}</h3>
            {words.map((word, index) => (
                <input
                    key={index}
                    type="text"
                    value={word}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className={styles.input}
                    placeholder={`${placeholder} ${index + 1}`}
                />
            ))}
        </div>
    )
}

export default CriterionInput
