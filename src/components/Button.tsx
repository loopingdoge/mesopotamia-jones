import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import Icon from 'react-icons-kit'

import { onlyIf } from '../utils'

const styles = StyleSheet.create({
    button: {
        transition: 'transform 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        border: '2px solid #90752d',
        backgroundColor: '#fdd466',
        outline: 'none',
        fontFamily: 'sans-serif',
        ':hover': {
            transform: 'scale(0.95)'
        },
        ':active': {
            transform: 'scale(0.90)'
        }
    }
})

export interface ButtonProps {
    customCSS?: any
    icon?: any
    text: string
    onClick: () => void
    autofocus?: boolean
    small?: boolean
    circular?: boolean
}

class Button extends React.Component<ButtonProps> {
    containerDiv: HTMLElement

    componentDidMount() {
        if (this.props.autofocus) {
            this.containerDiv.focus()
        }
    }

    onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            this.props.onClick()
        }
    }

    render() {
        const { icon, text, onClick, small, circular } = this.props
        const style = {
            padding: small ? '5px' : '10px',
            borderRadius: circular ? (small ? '15px' : '20px') : '4px'
        }
        return (
            <div
                onClick={this.props.onClick}
                onKeyDown={this.onKeyDown}
                className={css(styles.button, this.props.customCSS)}
                tabIndex={0}
                ref={element => (this.containerDiv = element)}
                style={style}
            >
                {icon !== undefined ? <Icon icon={icon} /> : ''}
                {text}
            </div>
        )
    }
}

export default Button
