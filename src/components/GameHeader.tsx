import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { androidMenu, close, grid, image } from 'react-icons-kit/ionicons/'

import { GameUI, UIStore } from '../stores/gameUIStore'

import { L10N } from '../l10n'

import { onlyIf } from '../utils'

import localized from '../containers/localized'
import Button from './Button'

const styles = StyleSheet.create({
    inventoryHeader: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 20,
        height: 50,
        backgroundColor: 'rgba(0,0,0,0.25)'
    },
    button: {
        marginLeft: '12px'
    },
    buttonRight: {
        position: 'absolute',
        right: 0,
        marginRight: '12px'
    },
    item: {
        width: 20,
        height: 20,
        marginLeft: 10
    }
})

export interface GameHeaderProps {
    gameUi: GameUI
    width: number
    show: (gameUi: GameUI) => void
    l10n: L10N
}

const GameHeader = localized(
    ({ l10n, gameUi, show, width }: GameHeaderProps) => (
        // tslint:disable-next-line:jsx-no-lambda
        <div className={css(styles.inventoryHeader)} style={{ width }}>
            <Button
                icon={image}
                text={l10n.map}
                onClick={
                    gameUi === GameUI.Map
                        ? show.bind(null, GameUI.Game)
                        : show.bind(null, GameUI.Map)
                }
                customCSS={styles.button}
            />
            <Button
                icon={grid}
                text={l10n.inventory}
                onClick={
                    gameUi === GameUI.Inventory
                        ? show.bind(null, GameUI.Game)
                        : show.bind(null, GameUI.Inventory)
                }
                customCSS={styles.button}
            />
            <Button
                icon={gameUi === GameUI.Game ? androidMenu : close}
                onClick={
                    gameUi === GameUI.Game
                        ? show.bind(null, GameUI.Menu)
                        : show.bind(null, GameUI.Game)
                }
                customCSS={styles.buttonRight}
            />
        </div>
    )
)

interface GameHeaderContainerProps {
    uiStore?: UIStore
}

export default inject('uiStore')(
    observer(({ uiStore }: GameHeaderContainerProps) => (
        <GameHeader
            gameUi={uiStore.state.ui}
            show={uiStore.show}
            width={uiStore.width}
        />
    ))
)
