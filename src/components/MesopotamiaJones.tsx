import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { css, StyleSheet } from 'aphrodite'

import { GameStore, GAME, RIDDLE } from '../stores/gameStore'
import Game from './Game'
import Riddle from './Riddle'

export interface MesopotamiaJonesProps {
    gameState: string
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

const MesopotamiaJones = ({ gameState }: MesopotamiaJonesProps) =>
    <div className={css(getStyles(gameState).mesopotamiaJonesContainer)}>
        <div className={css(getStyles(gameState).game)}>
            <Game />
        </div>
        <div className={css(getStyles(gameState).riddle)}>
            <Riddle />
        </div>
    </div>

export interface MesopotamiaJonesProps {
    gameStore?: GameStore
}

@inject('gameStore')
@observer
class MesopotamiaJonesContainer extends React.Component<MesopotamiaJonesProps, undefined> {

    componentDidMount() {
        this.props.gameStore.startGame()
    }

    render() {
        const { state } = this.props.gameStore
        return (
            <MesopotamiaJones gameState={state} />
        )
    }
}

export default MesopotamiaJonesContainer