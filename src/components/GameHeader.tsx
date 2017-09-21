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
        width: 40,
        height: 40,
        marginLeft: 10,
        backgroundColor: '#E37710',
        fontSize: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export interface GameHeaderProps {
    gameUi: GameUI
    width: number
    show: (gameUi: GameUI) => void
}

const GameHeader = ({ gameUi, show, width }: GameHeaderProps) =>
    <div className={css(styles.inventoryHeader)} style={{ width }}>
        <Button text={'🗺'} onClick={() => show(GameUI.Map)} />
        <Button text={'💡'} onClick={() => show(GameUI.Inventory)} />
        {onlyIf(
            gameUi !== GameUI.Game,
            <Button text={'X'} onClick={() => show(GameUI.Game)} />
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
