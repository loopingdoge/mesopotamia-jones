import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import * as React from 'react'

import { GameUI, UIStore } from '../stores/gameUIStore'

import Button from './Button'
import PressToContinue from './PressToContinue'

import l10n from '../l10n'
import { arvo } from '../utils/fonts'

import { close } from 'react-icons-kit/ionicons/'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'rgba(255, 255, 255, 0.28) 0px 0px 24px',
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        border: '1px solid rgba(255, 255, 255, 0.09)',
        margin: '64px 24px 24px 24px'
    },
    content: {
        maxWidth: 400,
        maxHeight: 400,
        width: '100%'
    },
    title: {
        borderBottom: '2px solid white',
        paddingBottom: 24,
        marginBottom: 24,
        color: 'white',
        textAlign: 'center',
        fontFamily: [arvo, 'sans-serif'],
        fontWeight: 'bold',
        fontSize: 'xx-large'
    },
    menuContainer: {},
    button: {
        margin: '10px 20px'
    },
    buttonRight: {
        position: 'absolute',
        right: 0,
        top: 5,
        marginRight: 12
    }
})

export interface GameMenuProps {
    show: (gameUi: GameUI) => void
}

class GameMenu extends React.Component<GameMenuProps> {
    render() {
        const { show } = this.props
        return (
            <div className={css(styles.container)}>
                <Button
                    icon={close}
                    onClick={show.bind(null, GameUI.Game)}
                    customCSS={styles.buttonRight}
                />
                <div className={css(styles.content)}>
                    <div className={css(styles.title)}>{l10n.menu}</div>
                    <div className={css(styles.menuContainer)}>
                        <Button
                            text={l10n.controls_game_controls}
                            onClick={() => null}
                            customCSS={styles.button}
                        />
                        <Button
                            text={l10n.close_game}
                            onClick={() => null}
                            customCSS={styles.button}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

interface GameMenuContainerProps {
    uiStore?: UIStore
}

export default inject('uiStore')(
    observer(({ uiStore }: GameMenuContainerProps) => (
        <GameMenu show={uiStore.show} />
    ))
)
