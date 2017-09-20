import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { GamePhase } from '../stores/gameStore'
import { GameUI } from '../stores/gameUIStore'

import FadedContainer from './FadedContainer'

const styles = StyleSheet.create({
    gameOverlayWrapper: {
        flex: 1,
        transition: 'opacity 0.3s cubic-bezier(.01,1,.91,.98)',
        position: 'absolute',
        flexDirection: 'column',
        backgroundImage:
            'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.7))'
    },
    gameOverlayContent: {
        flex: 1,
        border: '1px solid #a3540b',
        display: 'flex',
        padding: '50px'
    }
})

interface GameOverlayProps {
    width: number
    height: number
    gameUi: GameUI
    gamePhase: GamePhase
}

interface GameOverlayState {
    visible: boolean
}

class GameOverlay extends React.PureComponent<
    GameOverlayProps,
    GameOverlayState
> {
    constructor(props: GameOverlayProps) {
        super(props)
        this.state = {
            visible: false
        }
    }

    componentWillReceiveProps(nextProps: GameOverlayProps) {
        if (nextProps.gameUi !== this.props.gameUi) {
            if (
                nextProps.gameUi === GameUI.Inventory ||
                nextProps.gameUi === GameUI.Map
            ) {
                this.setState({ visible: true })
            } else if (nextProps.gameUi === GameUI.Game) {
                setTimeout(() => this.setState({ visible: false }), 300)
            }
        }
    }

    render() {
        const { width, height, gameUi, gamePhase } = this.props

        return (
            <div
                className={css(styles.gameOverlayWrapper)}
                style={{
                    width,
                    height,
                    opacity: gameUi === GameUI.Game ? 0 : 1,
                    zIndex: this.state.visible ? 1 : -1,
                    display: gamePhase === 'Game' ? 'flex' : 'none'
                }}
            >
                <div className={css(styles.gameOverlayContent)}>
                    {gameUi !== GameUI.Game && this.props.children}
                </div>
            </div>
        )
    }
}

export default GameOverlay
