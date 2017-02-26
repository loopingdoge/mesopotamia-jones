import * as React from 'react'
import LinearProgress from 'material-ui/LinearProgress'

export enum ProgressState {
    BLANK,
    LOADING,
    SHOWING_RESULT,
}

export interface RiddleProgressBarProps {
    state: 'BLANK' | 'LOADING' | 'SHOWING_RESULT'
    isCorrect: boolean
}

const RiddleProgressBar = ({ state, isCorrect }: RiddleProgressBarProps) => {
    switch (state) {
        case 'BLANK':
            return <LinearProgress mode='determinate' value={0} />
        case 'LOADING':
            return <LinearProgress mode='indeterminate' />
        case 'SHOWING_RESULT':
        default:
            const color = isCorrect ? '#4CAF50' : '#F44336'
            return <LinearProgress mode='determinate' color={color} value={100} />
    }
}

export default RiddleProgressBar