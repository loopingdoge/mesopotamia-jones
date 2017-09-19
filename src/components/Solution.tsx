import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { SolutionType } from '../config/riddles'
import { initList, mod, next, prev } from '../utils'
import LockCode from './LockCode'

const numbers: string[] = '0123456789'.split('')
const strings: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('')

/**
 * Returns the numbers or strings list depending on the given type
 * @param type number | string
 */
const listFromType = (type: SolutionType) =>
    type === 'number' ? numbers : strings

const styles = StyleSheet.create({
    solution: {
        borderRadius: 4,
        border: '2px solid #90752d',
        display: 'flex',
        flexDirection: 'row'
    }
})

/**
 * 
 * @param list An empty string list
 * @param refList The reference list (numbers or strings)
 * @param value The current fields' values
 */
function initListValues(list: string[], refList: string[], value: string) {
    return list.map((v, i) => refList.indexOf(value[i]))
}

export interface SolutionProps {
    length: number
    type: SolutionType
    value: string
    onChangeValue: (value: string) => void
}

export interface SolutionState {
    focusedIndex: number
}

export default class Solution extends React.Component<
    SolutionProps,
    SolutionState
> {
    constructor(props: SolutionProps) {
        super(props)
        this.state = { focusedIndex: 0 }
    }

    componentDidMount() {
        addEventListener('keydown', this.onKeyDown)
    }

    componentWillUnmount() {
        removeEventListener('keydown', this.onKeyDown)
    }

    onKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowLeft':
                this.setState({
                    focusedIndex: mod(
                        this.state.focusedIndex - 1,
                        this.props.length
                    )
                })
                break
            case 'ArrowRight':
                this.setState({
                    focusedIndex:
                        (this.state.focusedIndex + 1) % this.props.length
                })
                break
        }
    }

    setFocus = (i: number) => {
        this.setState({ focusedIndex: i })
    }

    /**
     * Returns a list containing the (numbers|strings)'s index for every field
     */
    get indexesInList() {
        return initListValues(
            initList(this.props.length),
            listFromType(this.props.type),
            this.props.value
        )
    }

    /**
     * Updates a field by incrementing/decrementing its index
     * @param currentValueIndex The current index
     * @param fieldIndex The field's index starting from the left
     * @param updateFn The function to call to update the field (next or prev)
     */
    updateField(
        currentValueIndex: number,
        fieldIndex: number,
        updateFn: (list: string[], index: number) => number
    ) {
        const newIndex = updateFn(
            listFromType(this.props.type),
            currentValueIndex
        )
        const indexesInList = this.indexesInList
        indexesInList[fieldIndex] = newIndex
        this.props.onChangeValue(this.fieldsToString(indexesInList))
    }

    /**
     * Returns a list of SolutionField components
     */
    getFields() {
        const fields = initList(this.props.length)
        return fields.map((_, i) =>
            <LockCode
                key={i}
                list={listFromType(this.props.type)}
                currentValueIndex={this.indexesInList[i]}
                onIncrement={() =>
                    this.updateField(this.indexesInList[i], i, next)}
                onDecrement={() =>
                    this.updateField(this.indexesInList[i], i, prev)}
                focused={this.state.focusedIndex === i}
                setFocus={() => this.setFocus(i)}
                index={i}
            />
        )
    }

    /**
     * Converts the the indexes' list values to a string
     */
    fieldsToString(indexesInList: number[]) {
        return indexesInList
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
