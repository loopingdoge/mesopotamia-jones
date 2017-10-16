import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'
import { Icon } from 'react-icons-kit'

import { arvo } from '../utils/fonts'

import Actions, {
    addActionListener,
    removeActionListener
} from '../config/actions'
import l10n from '../l10n'

import PressToContinue from './PressToContinue'

const fadeIn = {
    from: {
        opacity: 0
    },
    to: {
        opacity: 1
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'rgba(255, 255, 255, 0.28) 0px 0px 24px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.09)',
        margin: '15px 15px 15px 15px',
        animationName: [fadeIn],
        animationDuration: '1s'
    },
    theEnd: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: [arvo, 'sans-serif'],
        fontSize: '15vw',
        fontWeight: 'bold',
        color: 'white'
    }
})

export interface EndscreenProps {
    onClose: (...args: any[]) => any
}

class Endscreen extends React.Component<EndscreenProps> {
    componentDidMount() {
        addActionListener(Actions.CLOSE_END_SCREEN, this.props.onClose)
    }

    componentWillUnmount() {
        removeActionListener(Actions.CLOSE_END_SCREEN)
    }

    render() {
        return (
            <div className={css(styles.container)}>
                <div className={css(styles.theEnd)}>The end!</div>
                <PressToContinue />
            </div>
        )
    }
}

export default Endscreen
