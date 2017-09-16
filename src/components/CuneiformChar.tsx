import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import * as Khosrau from '../../assets/fonts/Khosrau/Khosrau.otf'

const khosrau = {
    fontFamily: 'Cuneiform',
    fontStyle: 'normal',
    fontWeight: 'normal',
    src: `url(${Khosrau}) format('opentype')`
}

const styles = StyleSheet.create({
    cuneiform: {
        fontFamily: [khosrau, 'sans-serif'],
        fontSize: 30
    },
    translated: {
        fontFamily: 'sans-serif',
        fontSize: 30
    },
    cuneiformLetter: {
        color: 'rgb(165, 91, 91)'
    },
    cuneiformNumber: {
        color: '#099'
    },
    cuneiformOperator: {
        color: '#ff6666'
    }
})

export interface CuneiformCharProps {
    value: string
    translated: boolean
}

class CuneiformChar extends React.Component<CuneiformCharProps, undefined> {
    style: any
    font: any
    isNumber: RegExp = /^\d+$/
    isLetter: RegExp = /^[a-zA-Z]+$/

    componentWillMount() {
        this.font = styles.cuneiform

        if (this.props.value.match(this.isLetter)) {
            this.style = styles.cuneiformLetter
        } else if (this.props.value.match(this.isNumber)) {
            this.style = styles.cuneiformNumber
        } else {
            this.style = styles.cuneiformOperator
        }
    }

    componentDidMount() {
        if (this.props.translated) {
            setTimeout(() => {
                this.font = styles.translated
                this.forceUpdate()
            }, 200 + Math.random() * 1500)
        }
    }

    render() {
        return (
            <span className={css(this.font, this.style)}>
                {this.props.value}
            </span>
        )
    }
}

export default CuneiformChar
