import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'
import Scrollbars from 'react-custom-scrollbars'

import CuneiformChar from './CuneiformChar'

const styles = StyleSheet.create({
    legend: {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'center', TODO: questo sarebbe da centrare, il problema e' che quando non c'e' abbastanza spazio non si vede piu' la parte sinistra
        padding: 8,
        overflowX: 'scroll'
    },
    alphabet: {
        display: 'flex',
        flexDirection: 'column'
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

const CuneiformLegend = () => (
    // <Scrollbars autoHide>
    <div className={css(styles.legend)} id="cuneiformLegend">
        <div className={css(styles.alphabet)}>
            {alphabetRows.map((row, rowIndex) => (
                <div key={rowIndex} className={css(styles.alphabetRow)}>
                    {row.split('').map((letter, letterIndex) => (
                        <div
                            key={letterIndex}
                            className={css(styles.legendCell)}
                        >
                            <div>
                                <CuneiformChar value={letter} />
                            </div>
                            <div>{letter}</div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </div>
)
// </Scrollbars>

export default CuneiformLegend
