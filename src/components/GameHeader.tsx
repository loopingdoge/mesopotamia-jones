import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import * as React from 'react'

import { onlyIf } from '../utils'
import Button from './Button'

import { GameUI, UIStore } from '../stores/gameUIStore'

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
    item: {
        width: 20,
        height: 20,
        marginLeft: 10,
        fontSize: 28
    }
})

export interface GameHeaderProps {
    gameUi: GameUI
    width: number
    show: (gameUi: GameUI) => void
}

const GameHeader = ({ gameUi, show, width }: GameHeaderProps) =>
    <div className={css(styles.inventoryHeader)} style={{ width }}>
        <Button
            customCSS={styles.item}
            text={'🗺'}
            onClick={() => show(GameUI.Map)}
        />
        <Button
            customCSS={styles.item}
            text={'💡'}
            onClick={() => show(GameUI.Inventory)}
        />
        {onlyIf(
            gameUi !== GameUI.Game,
            <Button
                customCSS={styles.item}
                text={'X'}
                onClick={() => show(GameUI.Game)}
            />
        )}
    </div>

interface GameHeaderContainerProps {
    uiStore?: UIStore
}

export default inject('uiStore')(
    observer(({ uiStore }: GameHeaderContainerProps) =>
        <GameHeader
            gameUi={uiStore.state.ui}
            show={uiStore.show}
            width={uiStore.width}
        />
    )
)
