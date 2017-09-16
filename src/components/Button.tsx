import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import Icon from 'react-icons-kit'

const push = {
    '50%': {
        transform: 'scale(0.9)'
    }
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        border: '2px solid #90752d',
        padding: '0px 10px',
        backgroundColor: '#fdd466',
        borderRadius: 4,
        outline: 'none',
        fontFamily: 'sans-serif',
        ':hover': {
            animationName: [push],
            animationDuration: '0.25s'
        },
        ':active': {
            animationName: [push],
            animationDuration: '0.5s'
        }
    }
})

export interface ButtonProps {
    icon: any
    text: string
    onClick: () => void
    autofocus?: boolean
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
        const { icon, text, onClick } = this.props
        return (
            <div
                onClick={this.props.onClick}
                onKeyDown={this.onKeyDown}
                className={css(styles.button)}
                tabIndex={0}
                ref={element => (this.containerDiv = element)}
            >
                <Icon icon={icon} />
                {text}
            </div>
        )
    }
}

export default Button
