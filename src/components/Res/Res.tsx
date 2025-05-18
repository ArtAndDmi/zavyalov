import React from 'react'
import classes from './Res.module.css'

interface Props {
    className?: string,
    matrix: number[][],
    criteria: string[],
    analogs: string[]
}

export const Res: React.FC<Props> = ({className = '', matrix, criteria, analogs}) => {
    console.log(matrix)

    const [min, mid, max] = [matrix[1][4], matrix[2][4], matrix[3][4]].sort((a, b) => a - b)
    return (
        <div className={className}>
            <h3>Результат</h3>
            <table className={classes.table}>
                <tr className={classes.thead}>
                    <td><b>Веса Критериев</b></td>
                    {criteria.map(cr => <td><b>{cr}</b></td>)}
                    <td><b>Глобальные</b></td>
                </tr>
                <tr>
                    <td></td>
                    {matrix[0].map(num => <td>{num === -1 ? '' : num.toFixed(4)}</td>)}
                </tr>
                <tr>
                    <td colSpan={6} style={{backgroundColor: '#6cb1ff'}}><b>Распределенный способ</b></td>
                </tr>
                <tr>
                    <td>{analogs[0]}</td>
                    {matrix[1].map((num, index) => (
                        <td
                            style={{
                                background: num === min ? 'red' : num === mid ? 'yellow' : num === max ? 'green' : ''
                            }}
                        >{num.toFixed(4)}
                        </td>
                    ))}
                </tr>
                <tr>
                    <td>{analogs[1]}</td>
                    {matrix[2].map((num, index) => (
                        <td
                            style={{
                                background: num === min ? 'red' : num === mid ? 'yellow' : num === max ? 'green' : ''
                            }}
                        >{num.toFixed(4)}
                        </td>
                    ))}
                </tr>
                <tr>
                    <td>{analogs[2]}</td>
                    {matrix[3].map((num, index) => (
                        <td
                            style={{
                                background: num === min ? 'red' : num === mid ? 'yellow' : num === max ? 'green' : ''
                            }}
                        >{num.toFixed(4)}
                        </td>
                    ))}
                </tr>
            </table>
        </div>
    )
}

export default Res
