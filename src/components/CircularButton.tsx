import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'
import { Motion, presets, spring } from 'react-motion'

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 22,
        border: '2px #333 solid',
        fontWeight: 'bolder',
        fontSize: 'x-large',
        cursor: 'pointer'
    }
})

interface CircularButtonProps {
    vertical?: boolean
    toggled: boolean
    onClick: () => void
}

const getRotation = (vertical: boolean, toggled: boolean) => {
    if (vertical) {
        return toggled ? 180 : 0
    } else {
        return toggled ? 90 : 270
    }
}

const getButtonStyle = (rotation: number) => ({
    transform: `rotate(${rotation}deg)`
})

const CircularButton = ({
    vertical = false,
    toggled,
    onClick
}: CircularButtonProps) => {
    const label = '<'
    return (
        <Motion
            style={{
                rotation: spring(getRotation(vertical, toggled), presets.stiff)
            }}
        >
            {({ rotation }) =>
                <div onClick={onClick} className={css(styles.button)}>
                    <span style={getButtonStyle(rotation)}>
                        {label}
                    </span>
                </div>}
        </Motion>
    )
}

export default CircularButton
