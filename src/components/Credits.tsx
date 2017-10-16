import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'
import { Icon } from 'react-icons-kit'
import { Route } from 'react-router-dom'

import { arvo } from '../utils/fonts'

import Actions, {
    addActionListener,
    removeActionListener
} from '../config/actions'
import l10n from '../l10n'

import Button from './Button'
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
        alignItems: 'center',
        boxShadow: 'rgba(255, 255, 255, 0.28) 0px 0px 24px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.09)',
        margin: '10px 10px 10px 10px',
        animationName: [fadeIn],
        animationDuration: '1s'
    },
    title: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: [arvo, 'sans-serif'],
        fontSize: '8vw',
        fontWeight: 'bold',
        color: 'white'
    },
    body: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: [arvo, 'sans-serif'],
        fontSize: '2vw',
        fontWeight: 'bold',
        color: 'white'
    },
    button: {
        minWidth: '25%'
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
                <div className={css(styles.title)}>Credits</div>
                <div className={css(styles.body)}>
                    <p>Project by: Looping Doge</p>
                    <p>- Alberto Nicoletti</p>
                    <p>- Devid Farinelli</p>
                </div>
                <Route
                    render={({ history }: any) => (
                        <Button
                            text={l10n.close_game}
                            onClick={() => history.push('/')}
                            customCSS={styles.button}
                        />
                    )}
                />
                <PressToContinue />
            </div>
        )
    }
}

export default Endscreen
