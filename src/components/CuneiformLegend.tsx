import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { Scrollbars } from 'react-custom-scrollbars'

import CuneiformChar from './CuneiformChar'

const styles = StyleSheet.create({
    legend: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 8,
    },
    legendCell: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 40,
        minHeight: 30,
    },
    legendNewline: {
        width: '100%'
    },
})

const alphabet = 'abcdefghijklmnopqrstuvz 0123456789 +-/*=?'.split('')

const CuneiformLegend = () =>
    <Scrollbars autoHide>
        <div className={css(styles.legend)}>
            {
                alphabet.map( (value, i) =>
                    value === ' ' ?
                        <div key={i} className={css(styles.legendNewline)}></div>
                        :
                        <div key={i} className={css(styles.legendCell)}>
                            <div>
                                <CuneiformChar value={value}/>
                            </div>
                            <div>{value}</div>
                        </div>
                )
            }
        </div>
    </Scrollbars>

export default CuneiformLegend