import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { image } from 'react-icons-kit/ionicons/image'
import { grid } from 'react-icons-kit/ionicons/grid'
import { close } from 'react-icons-kit/ionicons/close'

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
    button: {
        marginLeft: '12px',
        fontWeight: 'bold'
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
}

const GameHeader = ({ gameUi, show, width }: GameHeaderProps) => (
    // tslint:disable-next-line:jsx-no-lambda
    <div className={css(styles.inventoryHeader)} style={{ width }}>
        <div className={css(styles.button)}>
            <Button
                icon={image}
                iconSize={22}
                text={'Mappa'}
                onClick={show.bind(null, GameUI.Map)}
            />
        </div>
        <div className={css(styles.button)}>
            <Button
                icon={grid}
                iconSize={22}
                text={'Inventario'}
                onClick={show.bind(null, GameUI.Inventory)}
            />
        </div>
        <div className={css(styles.button)}>
            {onlyIf(
                gameUi !== GameUI.Game,
                <Button
                    icon={close}
                    iconSize={22}
                    onClick={show.bind(null, GameUI.Game)}
                />
            )}
        </div>
    </div>
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
