import { css, StyleSheet } from 'aphrodite'

import * as React from 'react'

import Button from './Button'

import l10store from '../stores/l10nStore'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    counter: {
        width: 100,
        marginLeft: 15,
        border: '2px solid #90752d',
        borderRadius: 9,
        fontSize: 24,
        fontFamily: 'monospace',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(253, 212, 02, 0.3)'
    },
    correctSolution: {
        boxShadow: '0px 1px 20px 3px rgb(253, 212, 102)',
        animationDuration: '500ms'
    }
})

export interface KnockDoorProps {
    value: string
    onChangeValue: (value: string) => void
    isCorrect: boolean
}

export default class KnockDoor extends React.Component<KnockDoorProps> {
    incrementCounter = () => {
        if (!this.props.isCorrect) {
            this.props.onChangeValue(`${parseInt(this.props.value, 10) + 1}`)
        }
    }

    render() {
        return (
            <div className={css(styles.container)}>
                <Button
                    text={l10store.dictionary.knock}
                    onClick={this.incrementCounter}
                />
                <div
                    className={css(
                        styles.counter,
                        this.props.isCorrect && styles.correctSolution
                    )}
                >
                    {this.props.value}
                </div>
            </div>
        )
    }
}
