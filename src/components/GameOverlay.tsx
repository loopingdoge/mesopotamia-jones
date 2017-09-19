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
    },
    editorSection: {
        padding: 20
    },
    gameOverlayWindow: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: '50px',
        zIndex: 19,
        flex: 1
    },
    gameOverlayContent: {
        flex: 1,
        border: '1px solid #a3540b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    placeholder: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
        border: '5px solid #eee',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    editorContainer: {
        display: 'flex',
        flex: 1,
        padding: 20,
        border: '1px solid #a3540b'
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
