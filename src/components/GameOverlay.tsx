import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { GameUI } from '../stores/gameUIStore'

const styles = StyleSheet.create({
    gameOverlayWrapper: {
        flex: 1,
        transition:
            'transform 0.5s cubic-bezier(.01,1,.91,.98), opacity 0.3s cubic-bezier(.01,1,.91,.98)',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#E37710',
        paddingTop: '50px'
    },
    gameOverlayContent: {
        flex: 1,
        border: '1px solid #a3540b',
        display: 'flex'
    }
})

interface GameOverlayProps {
    width: number
    height: number
    gameUi: GameUI
}

class GameOverlay extends React.PureComponent<GameOverlayProps> {
    render() {
        const { width, height, gameUi } = this.props

        return (
            <div
                className={css(styles.gameOverlayWrapper)}
                style={{
                    width,
                    height: height - 50,
                    transform: `translateY(${gameUi === GameUI.Game
                        ? '-100%'
                        : '0%'})`,
                    opacity: gameUi === GameUI.Game ? 0 : 1
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
