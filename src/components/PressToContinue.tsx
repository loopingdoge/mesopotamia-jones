import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import l10nStore from '../stores/l10nStore'
import { arvo } from '../utils/fonts'

import { isMobile, onlyIf } from '../utils'

const scaleAnimation = {
    '0%, 100%': {
        transform: 'translateY(0px)',
        color: '#f0ac43'
    },
    '50%': {
        transform: 'translateY(3px)',
        color: '#ba7916'
    }
}

const styles = StyleSheet.create({
    continueHint: {
        marginTop: '36px',
        textAlign: 'center',
        fontFamily: [arvo, 'sans-serif'],
        fontSize: 24,
        animationName: scaleAnimation,
        animationDuration: '2s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease'
    }
})

export default class PressToContinue extends React.Component {
    render() {
        return (
            <div className={css(styles.continueHint)}>
                {isMobile()
                    ? l10nStore.dictionary.continue_hint_mobile
                    : l10nStore.dictionary.continue_hint_keyboard}
            </div>
        )
    }
}
