import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { css, StyleSheet } from 'aphrodite'

import { GameStore, GAME, RIDDLE } from '../stores/gameStore'
import { UIStore } from '../stores/gameUIStore'

import Game from './Game'
import Riddle from './Riddle'
import DialogUI from './DialogUI'
import Inventory from './Inventory'

export interface MesopotamiaJonesProps {
    gameStore?: GameStore
    uiStore?: UIStore
}

const getStyles = (gameState: string) => StyleSheet.create({
    game: {
        display: gameState === GAME ? 'flex' : 'none',
        flex: 1,
    },
    riddle: {
        display: gameState === RIDDLE ? 'flex' : 'none',
        flex: 1,
    },
    mesopotamiaJonesContainer: {
        display: 'flex',
        flex: 1,
    }
})

const MesopotamiaJones = ({ gameStore, uiStore }: MesopotamiaJonesProps) =>
    <div className={css(getStyles(gameStore.gameState).mesopotamiaJonesContainer)}>
        <div className={css(getStyles(gameStore.gameState).game)}>
            <Game />
            {
                gameStore.gameState !== RIDDLE ?
                    <Inventory gameStore={gameStore} uiStore={uiStore}/>
                :
                    null
            }
        </div>
        {
            gameStore.gameState === RIDDLE ?
                <div className={css(getStyles(gameStore.gameState).riddle)}>
                    <Riddle />
                </div>
            :
                null
        }
        <DialogUI gameStore={gameStore} />
    </div>

@inject('gameStore', 'uiStore')
@observer
class MesopotamiaJonesContainer extends React.Component<MesopotamiaJonesProps, undefined> {

    componentDidMount() {
        this.props.gameStore.startGame()
    }

    render() {
        const { gameState } = this.props.gameStore

        return (
            <MesopotamiaJones gameStore={this.props.gameStore} uiStore={this.props.uiStore}/>
        )
    }
}

export default MesopotamiaJonesContainer