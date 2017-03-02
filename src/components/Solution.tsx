import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

const numbers: string[] = '0123456789'.split('')
const strings: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('')

type SolutionTypes = 'number' | 'string'

/**
 * Modulo operation which works on negative numbers too
 * @param n The number to be modulated
 * @param modulo The modulo
 */
function mod (n: number, modulo: number) {
    return ((n % modulo) + modulo) % modulo
}

function next<T> (list: T[], index: number) {
    return mod(index + 1, list.length)
}

function prev<T> (list: T[], index: number) {
    return mod(index - 1, list.length)
}

function initList (length: number) {
    const list = new Array(length)
    for (let i = 0; i < list.length; i ++) list[i] = 0
    return list
}

const listFromType = (type: SolutionTypes) => type === 'number' ? numbers : strings

const styles = StyleSheet.create({
    solutionField: {
        display: 'flex',
        flexDirection: 'column'
    },
    solution: {
        display: 'flex',
        flexDirection: 'row',
    },
})

export interface SolutionLabelProps {
    value: string
}

const SolutionLabel = ({ value }: SolutionLabelProps) =>
    <div>
        <span>{value}</span>
    </div>

export interface SolutionFieldProps {
    list: string[]
    currentValueIndex: number
    onIncrement: () => void
    onDecrement: () => void
}

const SolutionField = ({ list, currentValueIndex, onIncrement, onDecrement }: SolutionFieldProps) =>
    <div className={css(styles.solutionField)}>
        <button onClick={onIncrement}>⬆</button>
        <SolutionLabel value={list[currentValueIndex]} />
        <button onClick={onDecrement}>⬇</button>
    </div>

export interface SolutionProps {
    length: number
    type: SolutionTypes
    onChangeValue: (value: string) => void
}

export interface SolutionState {
    indexesInList: number[]
}

export default class Solution extends React.Component<SolutionProps, SolutionState> {

    constructor(props: SolutionProps) {
        super(props)
        const indexesInList = initList(props.length)
        this.state = { indexesInList }
    }

    updateField(currentValueIndex: number, fieldIndex: number, changeFn: (list: string[], index: number) => number) {
        const newIndex = changeFn(listFromType(this.props.type), currentValueIndex)
        const indexesInList = this.state.indexesInList
        indexesInList[fieldIndex] = newIndex
        this.setState({ indexesInList })
        this.props.onChangeValue(this.calculateValue())
    }

    getFields() {
        const fields = initList(this.props.length)
        return fields.map(
            (_, i) => <SolutionField
                    key={i}
                    list={listFromType(this.props.type)}
                    currentValueIndex={this.state.indexesInList[i]}
                    onIncrement={() => this.updateField(this.state.indexesInList[i], i, next)}
                    onDecrement={() => this.updateField(this.state.indexesInList[i], i, prev)}
                 />
        )
    }

    calculateValue() {
        return this.state.indexesInList
            .map(listIndex => listFromType(this.props.type)[listIndex])
            .join('')
    }

    render() {
        return (
            <div className={css(styles.solution)}>
                {this.getFields()}
            </div>
        )
    }

}