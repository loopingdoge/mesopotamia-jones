import { css, StyleSheet } from 'aphrodite'
import { throttle } from 'lodash'
import * as React from 'react'
import {
    androidArrowDropdown,
    androidArrowDropup
} from 'react-icons-kit/ionicons/'
import { Motion, spring } from 'react-motion'

import Button from './Button'

const labelHeight = 42

const styles = StyleSheet.create({
    lockCode: {
        padding: '8px',
        margin: '0px 2px',
        fontFamily: 'monospace',
        outline: 'none',
        display: 'flex',
        flexDirection: 'column'
    },
    fieldsColumn: {
        height: 125,
        overflowY: 'hidden'
    },
    innerFieldsColumn: {
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'hidden',
        textAlign: 'center'
    },
    solutionLabel: {
        fontSize: 22,
        height: labelHeight,
        lineHeight: `${labelHeight}px`
    },
    solutionHighlight: {
        backgroundColor: 'rgba(253, 212, 02, 0.3)',
        width: 30,
        height: 30,
        position: 'absolute',
        marginTop: 77,
        marginLeft: -2,
        border: '2px solid #90752d',
        borderRadius: 4
    }
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
    transform: `rotate3d(1, 0, 0, ${rotation}deg)`
})

export interface SolutionLabelProps {
    value: string
    activeIndex: number
    currentIndex: number
}

const SolutionLabel = ({
    value,
    activeIndex,
    currentIndex
}: SolutionLabelProps) =>
    <Motion
        style={interpolatedRotation(labelRotation(currentIndex, activeIndex))}
    >
        {({ rotation }) =>
            <div
                className={css(styles.solutionLabel)}
                style={labelStyle(
                    rotation,
                    labelColor(currentIndex, activeIndex)
                )}
            >
                <span>
                    {value}
                </span>
            </div>}
    </Motion>

// -------------------------------------------------------------------------------
// ---------------------------------- Lock Code ----------------------------------
// -------------------------------------------------------------------------------

const columnOffset = (currentIndex: number) => {
    let offset = labelHeight
    if (currentIndex > 0) {
        offset = (currentIndex - 1) * -offset
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
    focused: boolean
    setFocus: (...args: any[]) => any
    index: number
    isCorrect: boolean
}

class LockCode extends React.PureComponent<LockCodeProps> {
    lastSwipeTime: number = Date.now()
    lastSwipeY: number = 0
    lockCodeDiv: HTMLElement

    componentDidMount() {
        if (this.props.focused) {
            this.lockCodeDiv.focus()
        }
    }

    componentWillReceiveProps(nextProps: LockCodeProps) {
        if (this.props.focused && !nextProps.focused) {
            this.lockCodeDiv.blur()
        }
        if (!this.props.focused && nextProps.focused) {
            this.lockCodeDiv.focus()
        }
    }

    onIncrement = () => !this.props.isCorrect && this.props.onIncrement()

    onDecrement = () => !this.props.isCorrect && this.props.onDecrement()

    onKeyDown = (event: any) => {
        switch (event.key) {
            case 'ArrowUp':
                this.onDecrement()
                break
            case 'ArrowDown':
                this.onIncrement()
                break
        }
    }

    onTouchStart = (event: any) => {
        this.lastSwipeY = event.touches[0].clientY
    }

    onTouchMove = (event: any) => {
        const now = Date.now()
        if (now > this.lastSwipeTime + 500) {
            const swipeY = event.touches[0].clientY
            if (swipeY > this.lastSwipeY) {
                this.onDecrement()
            } else {
                this.onIncrement()
            }
            this.lastSwipeY = swipeY
            this.lastSwipeTime = now
        }
    }

    render() {
        const { list, currentValueIndex, focused } = this.props

        const labelList = list.map((item, i) =>
            <SolutionLabel
                key={i}
                value={item}
                activeIndex={i}
                currentIndex={currentValueIndex}
            />
        )

        return (
            <div
                tabIndex={this.props.index}
                className={css(styles.lockCode)}
                ref={lockCodeDiv => (this.lockCodeDiv = lockCodeDiv)}
                onKeyDown={this.onKeyDown}
                onTouchStart={this.onTouchStart}
                onTouchMove={this.onTouchMove}
                onMouseDown={this.props.setFocus}
            >
                <div className={css(styles.solutionHighlight)} />
                <Button
                    icon={androidArrowDropup}
                    text={''}
                    onClick={this.onDecrement}
                    small
                    circular
                    disabled={currentValueIndex === 0}
                />
                <div className={css(styles.fieldsColumn)}>
                    <Motion
                        style={{
                            offset: spring(columnOffset(currentValueIndex))
                        }}
                    >
                        {({ offset }) =>
                            <div
                                className={css(styles.innerFieldsColumn)}
                                style={columnStyle(offset)}
                            >
                                {labelList}
                            </div>}
                    </Motion>
                </div>
                <Button
                    icon={androidArrowDropdown}
                    text={''}
                    onClick={this.onIncrement}
                    small
                    circular
                    disabled={currentValueIndex === list.length - 1}
                />
            </div>
        )
    }
}

export default LockCode
