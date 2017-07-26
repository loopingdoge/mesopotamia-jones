import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { css, StyleSheet } from 'aphrodite'

import { onlyIf } from '../utils'

import { GameStore, GAME, RIDDLE } from '../stores/gameStore'
import { UIStore } from '../stores/gameUIStore'

import Game from './Game'
import Riddle from './Riddle'
import DialogUI from './DialogUI'
import Inventory from './Inventory'
import GameHeader from './GameHeader'

const styles = StyleSheet.create({
    mesopotamiaJonesContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FDF6E3'
    },
    content: {
        height: 'inherit'
    }
})

const getPosition: (gameState: string) => 'initial' | 'absolute' = (
    gameState: string
) => (gameState === GAME ? 'initial' : 'absolute')

const getStyles = (gameState: string) => ({
    game: {
        display: 'flex',
        flex: 1,
        position: getPosition(gameState),
        opacity: gameState === GAME ? 1 : 0,
        zIndex: gameState === GAME ? 0 : -9999
    },
    riddle: {
        display: gameState === RIDDLE ? 'flex' : 'none',
        flex: 1
    }
})

export interface MesopotamiaJonesProps {
    gameState: string
    pageWidth: number
    pageHeight: number
}

const MesopotamiaJones = ({
    gameState,
    pageWidth,
    pageHeight
}: MesopotamiaJonesProps) => {
    const MaybeHeader = onlyIf(gameState !== RIDDLE, <GameHeader />)
    const MaybeInventory = onlyIf(gameState !== RIDDLE, <Inventory />)
    const MaybeRiddle = onlyIf(
        gameState === RIDDLE,
        <div
            style={getStyles(gameState).riddle}
            className={css(styles.content)}
        >
            <Riddle />
        </div>
    )
    return (
        <div className={css(styles.mesopotamiaJonesContainer)}>
            <div style={{ width: pageWidth, height: pageHeight }}>
                <DialogUI />
                {MaybeHeader}
                <div
                    style={getStyles(gameState).game}
                    className={css(styles.content)}
                >
                    <Game width={pageWidth} height={pageHeight} />
                    {MaybeInventory}
                </div>
                {MaybeRiddle}
            </div>
        </div>
    )
}

interface MesopotamiaJonesContainerProps {
    gameStore?: GameStore
    uiStore?: UIStore
}

@inject('gameStore', 'uiStore')
@observer
class MesopotamiaJonesContainer extends React.Component<
    MesopotamiaJonesContainerProps,
    undefined
> {
    componentDidMount() {
        this.props.gameStore.startGame()
    }

    render() {
        const { gameState } = this.props.gameStore
        const { width, height } = this.props.uiStore
        return (
            <MesopotamiaJones
                gameState={gameState}
                pageWidth={width}
                pageHeight={height}
            />
        )
    }
}

export default MesopotamiaJonesContainer
