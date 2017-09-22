import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { isMobile, onlyIf } from '../utils'

const scaleAnimation = {
    '0%, 100%': {
        transform: 'scale(1)',
        opacity: 1
    },
    '50%': {
        transform: 'scale(0.97)',
        opacity: 0.9
    }
}

const styles = StyleSheet.create({
    continueHint: {
        marginTop: '36px',
        fontSize: 24,
        textAlign: 'center',
        animationName: scaleAnimation,
        animationDuration: '2s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        color: '#f0ac43'
    }
})

export default class PressToContinue extends React.PureComponent {
    render() {
        return (
            <div className={css(styles.continueHint)}>
                {isMobile() ? 'Tocca per continuare' : 'Premi F per continuare'}
            </div>
        )
    }
}
