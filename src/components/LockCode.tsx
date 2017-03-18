import * as React from 'react'
import { Motion, spring } from 'react-motion'
import { css, StyleSheet } from 'aphrodite'

const styles = StyleSheet.create({
    lockCode: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 8px',
    },
    fieldsColumn: {
        height: 125,
        overflowY: 'hidden',
    },
    innerFieldsColumn: {
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'hidden',
        textAlign: 'center',
    },
    solutionLabel: {
        padding: '8px 0px',
        fontSize: 22,
    },
})

// -------------------------------------------------------------------------------
// ------------------------------------ Label ------------------------------------
// -------------------------------------------------------------------------------

const labelRotation = (currentIndex: number, activeIndex: number) => {
    const scarto = Math.abs(currentIndex - activeIndex)
    if (currentIndex > activeIndex) {
        return scarto === 1 ? -45 : -90
    } else if (currentIndex < activeIndex) {
        return scarto === 1 ? 45 : 90
    } else {
        return 0
    }
}

const interpolatedRotation = (rotation: number) => ({
    rotation: spring(rotation)
})

const labelColor = (currentIndex: number, activeIndex: number) =>
    currentIndex === activeIndex ? '#000000' : '#3a3a3a'

const labelStyle = (rotation: number, color: string) => ({
    color,
    transform: `rotate3d(1, 0, 0, ${rotation}deg)`,
})

export interface SolutionLabelProps {
    value: string
    activeIndex: number
    currentIndex: number
}

export interface LabelInterpolatedStyles {
    rotation: number
}

const SolutionLabel = ({ value, activeIndex, currentIndex }: SolutionLabelProps) =>
    <Motion style={interpolatedRotation(labelRotation(currentIndex, activeIndex))}>
        {
            ({ rotation }: LabelInterpolatedStyles) =>
                <div className={css(styles.solutionLabel)} style={labelStyle(rotation, labelColor(currentIndex, activeIndex))} >
                    <span>{value}</span>
                </div>
        }
    </Motion>

// -------------------------------------------------------------------------------
// ---------------------------------- Lock Code ----------------------------------
// -------------------------------------------------------------------------------

const columnOffset = (currentIndex: number) => {
    let offset = 41
    if (currentIndex > 0) {
        offset = (currentIndex - 1) * -41
    }
    return offset
}

const columnStyle = (offset: number) => {
    return {
        transform: `translateY(${offset}px)`
    }
}

export interface LockCodeProps {
    list: string[]
    currentValueIndex: number
    onIncrement: () => void
    onDecrement: () => void
}

export interface LockCodeInterpolatedStyles {
    offset: number
}

const LockCode = ({ list, currentValueIndex, onIncrement, onDecrement }: LockCodeProps) => {
    const labelList = list.map((item, i) => <SolutionLabel key={i} value={item} activeIndex={i} currentIndex={currentValueIndex} />)
    return (
        <div className={css(styles.lockCode)}>
            <button onClick={onDecrement}>⬆</button>
            <div className={css(styles.fieldsColumn)}>
                <Motion style={{ offset: spring(columnOffset(currentValueIndex)) }}>
                    {
                        ({ offset }: LockCodeInterpolatedStyles) =>
                            <div className={css(styles.innerFieldsColumn)} style={columnStyle(offset)}>
                                {labelList}
                            </div>
                    }
                </Motion>
            </div>
            <button onClick={onIncrement}>⬇</button>
        </div>
    )
}

export default LockCode