import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import CuneiformChar from './CuneiformChar'

const styles = StyleSheet.create({
    cuneiformSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        opacity: 1,
        flex: '1 0',
        textAlign: 'center',
        userSelect: 'none'
    },
    riddleText: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    charWrapper: {
        ':hover': {
            backgroundColor: 'rgba(253, 212, 02, 0.3)',
            boxShadow: '0px 1px 11px -1px #90752d',
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer'
        }
    }
})

export interface RiddleCuneiformSectionProps {
    riddle: string
    translated: boolean
    onCharOver: (char: string) => void
}

const RiddleCuneiformSection = ({
    riddle,
    translated,
    onCharOver
}: RiddleCuneiformSectionProps) => (
    <div className={css(styles.cuneiformSection)} id="cuneiformRiddle">
        <div className={css(styles.riddleText)}>
            {riddle.split('').map((value, i) => (
                <div
                    key={i}
                    className={css(styles.charWrapper)}
                    onMouseEnter={() => onCharOver(value)}
                    onMouseLeave={() => onCharOver(null)}
                >
                    <CuneiformChar value={value} translated={translated} />
                </div>
            ))}
        </div>
    </div>
)

export default RiddleCuneiformSection
