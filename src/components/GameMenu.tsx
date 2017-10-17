import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { close } from 'react-icons-kit/ionicons/'
import { Route } from 'react-router-dom'

import { arvo } from '../utils/fonts'

import { GameUI, UIStore } from '../stores/gameUIStore'
import { L10NStore } from '../stores/l10nStore'

import { L10N, Language } from '../l10n'

import localized from '../containers/localized'
import Button from './Button'
import PressToContinue from './PressToContinue'

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
    menuItem: {
        margin: '10px 20px'
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 5,
        marginRight: 12
    },
    langWrapper: {
        display: 'flex',
        justifyContent: 'center'
    },
    button: {
        padding: '0px 4px',
        marginRight: '10px'
    }
})

export interface GameMenuProps {
    l10n: L10N
    show: (gameUi: GameUI) => void
    changeLanguage: (language: Language) => void
}

class GameMenu extends React.Component<GameMenuProps> {
    render() {
        const { changeLanguage, l10n, show } = this.props
        return (
            <div className={css(styles.container)}>
                <Button
                    icon={close}
                    onClick={show.bind(null, GameUI.Game)}
                    customCSS={styles.closeButton}
                />
                <div className={css(styles.content)}>
                    <div className={css(styles.title)}>{l10n.menu}</div>
                    <div className={css(styles.menuContainer)}>
                        <Button
                            text={l10n.controls_game_controls}
                            onClick={show.bind(null, GameUI.Help)}
                            customCSS={styles.menuItem}
                        />
                        <Route
                            render={({ history }: any) => (
                                <Button
                                    text={l10n.close_game}
                                    onClick={() => history.push('/')}
                                    customCSS={styles.menuItem}
                                />
                            )}
                        />
                        <div
                            className={css(styles.langWrapper, styles.menuItem)}
                        >
                            <Button
                                flag={'IT'}
                                iconSize={38}
                                onClick={() => changeLanguage('it')}
                                customCSS={styles.button}
                            />
                            <Button
                                flag={'GB'}
                                iconSize={38}
                                onClick={() => changeLanguage('en')}
                                customCSS={styles.button}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

interface GameMenuContainerProps {
    uiStore?: UIStore
    l10nStore?: L10NStore
}

export default inject('uiStore', 'l10nStore')(
    observer(({ uiStore, l10nStore }: GameMenuContainerProps) => {
        const LocalizedMenu = localized(GameMenu)
        return (
            <LocalizedMenu
                show={uiStore.show}
                changeLanguage={l10nStore.changeLanguage}
            />
        )
    })
)
