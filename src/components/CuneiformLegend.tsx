import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'
import Scrollbars from 'react-custom-scrollbars'

import CuneiformChar from './CuneiformChar'

const styles = StyleSheet.create({
    legend: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 8
    },
    alphabet: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    alphabetRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    legendCell: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 40,
        minHeight: 30
    }
})

const alphabet = 'abcdefghijklmnopqrstuvwxyz 0123456789 +-/*=?'
const alphabetRows = alphabet.split(' ')

const CuneiformLegend = () =>
    // <Scrollbars autoHide>
    <div className={css(styles.legend)}>
        <div className={css(styles.alphabet)}>
            {alphabetRows.map((row, rowIndex) =>
                <div className={css(styles.alphabetRow)}>
                    {row.split('').map((letter, letterIndex) =>
                        <div
                            key={letterIndex}
                            className={css(styles.legendCell)}
                        >
                            <div>
                                <CuneiformChar value={letter} />
                            </div>
                            <div>
                                {letter}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>
// </Scrollbars>

export default CuneiformLegend
