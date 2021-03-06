import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { khosrau } from '../utils/fonts'

const styles = StyleSheet.create({
    default: {
        minWidth: 15,
        fontSize: 32
    },
    cuneiform: {
        fontFamily: [khosrau, 'sans-serif']
    },
    translated: {
        fontFamily: 'monospace'
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
    translated?: boolean
}

class CuneiformChar extends React.Component<CuneiformCharProps, undefined> {
    char: string
    style: any
    font: any
    isNumber: RegExp = /^\d+$/
    isLetter: RegExp = /^[a-zA-Z]+$/

    componentWillMount() {
        this.font = styles.cuneiform
        this.char = this.props.value

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
                this.char = this.props.value
                this.font = styles.translated
                this.forceUpdate()
            }, 200 + Math.random() * 1500)
        }
    }

    render() {
        return (
            <div className={css(styles.default, this.font, this.style)}>
                {this.char}
            </div>
        )
    }
}

export default CuneiformChar
