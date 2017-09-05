import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import * as React from 'react'

import { getOrElse, onlyIf } from '../utils'

import { GamePhase, GameState, GameStore } from '../stores/gameStore'
import { UIStore } from '../stores/gameUIStore'

import Dialogue from './Dialogue'
import FadedContainer from './FadedContainer'
import FoundItem from './FoundItem'
import Game from './Game'
import GameHeader from './GameHeader'
import Inventory from './Inventory'
import Riddle from './Riddle'

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

const getPosition: (phase: GamePhase) => 'initial' | 'absolute' = (
    phase: GamePhase
) => (phase === 'Game' ? 'initial' : 'absolute')

const getStyles = (phase: GamePhase) => ({
    game: {
        display: 'flex',
        flex: 1,
        position: getPosition(phase),
        opacity: phase === 'Game' ? 1 : 0,
        zIndex: phase === 'Game' ? 0 : -9999
    },
    riddle: {
        display: phase === 'Riddle' ? 'flex' : 'none',
        flex: 1
    }
})

export interface MesopotamiaJonesProps {
    gameState: GameState
    pageWidth: number
    pageHeight: number
}

const MesopotamiaJones = ({
    gameState,
    pageWidth,
    pageHeight
}: MesopotamiaJonesProps) => {
    const MaybeHeader = onlyIf(gameState.phase !== 'Riddle', <GameHeader />)
    const MaybeInventory = onlyIf(gameState.phase !== 'Riddle', <Inventory />)
    const MaybeRiddle = onlyIf(
        gameState.phase === 'Riddle',
        <div
            style={getStyles(gameState.phase).riddle}
            className={css(styles.content)}
        >
            <Riddle />
        </div>
    )
    const MaybeDialogue = onlyIf(
        gameState.activeDialogue !== null,
        <FadedContainer>
            <Dialogue />
        </FadedContainer>
    )
    const MaybeFoundItem = onlyIf(
        gameState.activeFoundItem !== null,
        <FadedContainer>
            <FoundItem item={gameState.activeFoundItem} />
        </FadedContainer>
    )

    return (
        <div className={css(styles.mesopotamiaJonesContainer)}>
            <div style={{ width: pageWidth, height: pageHeight }}>
                {MaybeDialogue}
                {MaybeFoundItem}
                {MaybeHeader}
                <div
                    style={getStyles(gameState.phase).game}
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
    MesopotamiaJonesContainerProps
> {
    componentDidMount() {
        this.props.gameStore.startGame()
    }

    render() {
        const { state } = this.props.gameStore
        const { width, height } = this.props.uiStore
        return (
            <MesopotamiaJones
                gameState={state}
                pageWidth={width}
                pageHeight={height}
            />
        )
    }
}

export default MesopotamiaJonesContainer
