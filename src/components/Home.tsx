import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import { RouterStore } from 'mobx-react-router'
import * as React from 'react'

import { defaultGameStoreState, GameStore } from '../stores/gameStore'

import Button from './Button'
import Section from './Section'

const styles = StyleSheet.create({
    homeContainer: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#FDF6E3',
        alignItems: 'center',
        justifyContent: 'center'
    },
    home: {
        width: '600px',
        display: 'flex',
        flexDirection: 'column'
    },
    body: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    title: {
        padding: '24px',
        textAlign: 'center',
        fontSize: 'xx-large'
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    footer: {}
})

export interface HomeProps {
    startGame: () => void
    newGame: () => void
    showCredits: () => void
    saveFileExists: boolean
}

const Home = ({
    startGame,
    newGame,
    showCredits,
    saveFileExists
}: HomeProps) => (
    <div className={css(styles.homeContainer)}>
        <div className={css(styles.home)}>
            <div className={css(styles.title)}>
                <h1>Mesopotamia Jones</h1>
            </div>
            <div className={css(styles.buttonsContainer)}>
                <Button onClick={newGame} text={'Nuova partita'} />
                <Button onClick={startGame} text={'Continua'} />
                <Button onClick={showCredits} text={'Crediti'} />
            </div>
        </div>
    </div>
)

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
                saveFileExists={
                    this.props.gameStore.state.progression.isGameStarted
                }
            />
        )
    }
}

export default HomeContainer
