import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import { RouterStore } from 'mobx-react-router'
import * as React from 'react'

import { GameStore } from '../stores/gameStore'
import Section from './Section'

const styles = StyleSheet.create({
    homeContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    body: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    footer: {}
})

export interface HomeProps {
    startGame: () => void
    newGame: () => void
    showCredits: () => void
}

const Home = ({ startGame, newGame, showCredits }: HomeProps) =>
    <div className={css(styles.homeContainer)}>
        <h1>Mesopotamia Jones</h1>
        <div>
            <button onClick={newGame}>New Game</button>
            <button onClick={startGame}>Continue</button>
        </div>
        <div>
            <button onClick={showCredits}>Credits</button>
        </div>
    </div>

export interface HomeContainerProps {
    gameStore?: GameStore
    routingStore?: RouterStore
}

@inject('gameStore', 'routingStore')
@observer
class HomeContainer extends React.Component<HomeContainerProps, undefined> {
    startGame = () => {
        this.props.routingStore.push('/game')
    }

    newGame = () => {
        this.props.gameStore.newGame()
        this.props.routingStore.push('/game')
    }

    showCredits = () => {
        console.log('TODO credits')
    }

    render() {
        return (
            <Home
                startGame={this.startGame}
                newGame={this.newGame}
                showCredits={this.showCredits}
            />
        )
    }
}

export default HomeContainer
