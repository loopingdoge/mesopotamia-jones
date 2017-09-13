import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import Icon from 'react-icons-kit'

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
        outline: 'none'
    }
})

export interface ButtonProps {
    icon: any
    text: string
    onClick: () => void
}

const Button = ({ icon, text, onClick }: ButtonProps) =>
    <div onClick={onClick} className={css(styles.button)}>
        <Icon icon={icon} />
        {text}
    </div>

export default Button
