import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

const styles = StyleSheet.create({
    notificationContainer: {
        position: 'fixed',
        transition: 'transform 1s ease, opacity 1s ease',
        width: '20vw',
        height: '30px',
        backgroundColor: '#F44336',
        color: 'white',
        bottom: '0px',
        textAlign: 'center',
    },
    notificationNotVisible: {
        transform: 'translateY(50px)',
        opacity: 0,
    },
    notificationVisible: {
        transform: 'translateY(0px)',
        opacity: 1,
    },
})

export interface RiddleNotificationProps {
    text: string
    isVisible: boolean
}

const RiddleNotification = ({ text, isVisible }: RiddleNotificationProps) => {
    const visibilityStyle = isVisible ? styles.notificationVisible : styles.notificationNotVisible
    return (
        <div className={css(styles.notificationContainer, visibilityStyle)}>
            <span>{text}</span>
        </div>
    )
}

export default RiddleNotification