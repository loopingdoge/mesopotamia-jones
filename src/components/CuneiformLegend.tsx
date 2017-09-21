import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'
import Scrollbars from 'react-custom-scrollbars'

import CuneiformChar from './CuneiformChar'

const styles = StyleSheet.create({
    legend: {
        width: '100%',
        padding: 8
    },
    alphabet: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflowY: 'scroll'
    },
    legendCell: {
        width: 50,
        height: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
})

const alphabet = 'abcdefghijklmnopqrstuvwxyz 0123456789 !?'
const alphabetRows = alphabet.split(' ')

const CuneiformLegend = () =>
    <div className={css(styles.legend)} id="cuneiformLegend">
        <div className={css(styles.alphabet)}>
            {alphabetRows.map((row, rowIndex) =>
                row.split('').map((letter, letterIndex) =>
                    <div key={letterIndex} className={css(styles.legendCell)}>
                        <div>
                            <CuneiformChar value={letter} />
                        </div>
                        <div>
                            {letter}
                        </div>
                    </div>
                )
            )}
        </div>
    </div>

export default CuneiformLegend
