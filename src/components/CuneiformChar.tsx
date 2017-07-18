import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

const khosrau = {
    fontFamily: 'Cuneiform',
    fontStyle: 'normal',
    fontWeight: 'normal',
    src: 'url(\'../../assets/fonts/Khosrau/Khosrau.otf\') format(\'opentype\')'
}

const styles = StyleSheet.create({
    cuneiform: {
        fontFamily: [khosrau, 'sans-serif'],
        fontSize: 30,
    },
    cuneiformLetter: {
        color: '#333'
    },
    cuneiformNumber: {
        color: '#099'
    },
    cuneiformOperator: {
        color: '#ff6666',
    },
})

export interface CuneiformCharProps {
    value: string
}

class CuneiformChar extends React.Component<CuneiformCharProps, undefined> {

    style: any
    isNumber: RegExp = /^\d+$/
    isLetter: RegExp = /^[a-zA-Z]+$/

    componentWillMount() {
        if ( this.props.value.match(this.isLetter) ) {
            this.style = styles.cuneiformLetter
        } else if ( this.props.value.match(this.isNumber) ) {
            this.style = styles.cuneiformNumber
        } else {
            this.style = styles.cuneiformOperator
        }
    }

    render() {
        return (
            <span className={css(styles.cuneiform, this.style)}>
                {this.props.value}
            </span>
        )
    }
}

export default CuneiformChar