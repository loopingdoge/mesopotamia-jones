import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { GameUI } from '../stores/gameUIStore'

const styles = StyleSheet.create({
    gameOverlayWrapper: {
        position: 'absolute',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#E37710',
        paddingTop: '50px'
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
                    display: gameUi === GameUI.Game ? 'none' : 'flex'
                }}
            >
                {gameUi !== GameUI.Game && this.props.children}
            </div>
        )
    }
}

export default GameOverlay
