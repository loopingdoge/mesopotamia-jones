import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { FlagIcon } from 'react-flag-kit'
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
        fontFamily: 'sans-serif',
        color: 'black',
        textDecoration: 'none',
        userSelect: 'none'
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
    disabled: {},
    textContainer: {
        marginLeft: '4px'
    }
})

export interface ButtonProps {
    customCSS?: any
    icon?: any
    flag?: string
    iconSize?: number
    text?: string
    onClick: (...args: any[]) => any
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
        const {
            icon,
            flag,
            iconSize,
            text,
            onClick,
            small,
            circular,
            disabled,
            customCSS
        } = this.props
        const style = {
            padding: small ? '5px' : '10px',
            borderRadius: circular ? (small ? '15px' : '30px') : '4px'
        }

        return (
            <div
                onClick={onlyIf(!disabled, this.props.onClick)}
                onKeyDown={this.onKeyDown}
                className={css(
                    styles.button,
                    disabled ? styles.disabled : styles.active,
                    customCSS
                )}
                tabIndex={0}
                ref={element => (this.containerDiv = element)}
                style={style}
            >
                {flag !== undefined ? (
                    <FlagIcon code={flag} size={iconSize} />
                ) : (
                    ''
                )}
                {icon !== undefined ? <Icon icon={icon} size={iconSize} /> : ''}

                {onlyIf(
                    Boolean(text),
                    <div className={css(styles.textContainer)}>{text}</div>
                )}
            </div>
        )
    }
}

export default Button
