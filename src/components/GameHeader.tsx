import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { css, StyleSheet } from 'aphrodite'

import { onlyIf } from '../utils'

import { GAME, MAP, BLUEP, UIStore } from '../stores/gameUIStore'

const styles = StyleSheet.create({
    inventoryHeader: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 20,
        height: 50,
        backgroundColor: 'rgba(0,0,0,0.25)',
    },
    item: {
        width: 40,
        height: 40,
        marginLeft: 10,
        backgroundColor: '#E37710',
        fontSize: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export interface GameHeaderProps {
    selected: string
    width: number
    show: (selected: string) => void
}

const GameHeader = ({ selected, show, width }: GameHeaderProps) =>
    <div className={css(styles.inventoryHeader)} style={{ width }}>
        <button className={css(styles.item)} onClick={ () => show ( MAP ) }>🗺️</button>
        <button className={css(styles.item)} onClick={ () => show ( BLUEP ) }>💡</button>
        {onlyIf(selected !== GAME,
            <button className={css(styles.item)} onClick={ () => show ( GAME ) }>X</button>)}
    </div>

interface GameHeaderContainerProps {
    uiStore?: UIStore
}

export default inject('uiStore')(observer(({ uiStore }: GameHeaderContainerProps) =>
    <GameHeader
        selected={uiStore.state.selected}
        show={uiStore.show}
        width={uiStore.width}
    />
))