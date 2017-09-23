import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import Icon from 'react-icons-kit'

import { onlyIf } from '../utils'

const styles = StyleSheet.create({
    button: {
        transition: 'transform 0.3s ease, background-color 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #90752d',
        outline: 'none',
        fontFamily: 'sans-serif'
    },
    active: {
        backgroundColor: '#fdd466',
        cursor: 'pointer',
        ':hover': {
            transform: 'scale(0.95)'
        },
        ':active': {
            transform: 'scale(0.85)'
        }
    },
    disabled: {}
})

export interface ButtonProps {
    customCSS?: any
    icon?: any
    text: string
    onClick: () => void
    autofocus?: boolean
    small?: boolean
    circular?: boolean
    disabled?: boolean
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
        const { icon, text, onClick, small, circular, disabled } = this.props
        const style = {
            padding: small ? '5px' : '10px',
            borderRadius: circular ? (small ? '15px' : '20px') : '4px'
        }
        return (
            <div
                onClick={!disabled && this.props.onClick}
                onKeyDown={this.onKeyDown}
                className={css(
                    styles.button,
                    this.props.customCSS,
                    disabled ? styles.disabled : styles.active
                )}
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
