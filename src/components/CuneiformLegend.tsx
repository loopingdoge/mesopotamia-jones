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
    legendExpanded: {
        transition: 'all 0.5s ease',
        flex: '1 0',
    },
    legendShrinked: {
        transition: 'all 0.5s ease',
        flex: '0 1',
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

export interface CuneiformLegendProps {
    isExpanded: boolean
}
class CuneiformLegend extends React.Component<CuneiformLegendProps, undefined> {

    alphabet: string[] = 'abcdefghijklmnopqrstuvz 0123456789 +-/*=?'.split('')

    render() {
        return (
            <div className={css(this.props.isExpanded ? styles.legendExpanded : styles.legendShrinked)}>
                <Scrollbars autoHide>
                    <div className={css(styles.legend)}>
                        {
                            this.alphabet.map( (value, i) =>
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
            </div>
        )
    }
}

export default CuneiformLegend