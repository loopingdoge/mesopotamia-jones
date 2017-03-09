import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'


import { UIStore } from '../stores/uiStore'
import { GameStore } from '../stores/gameStore'
import PhaserGame from '../phaser'

export interface GameProps {
    width: number
    height: number
    game: PhaserGame
}

export class Game extends React.Component<GameProps, void> {

    // getGameScale = () => {
    //     let width = 0
    //     let height = 0
    //     if (this.props.width < this.props.height) {
    //         width = this.props.width
    //         height = (width / 16) * 9
    //     } else {
    //         height = this.props.height
    //         width = (height / 9) * 16
    //     }
    //     return { width, height }
    // }

    render() {
        // const { width, height } = this.getGameScale()

        return (
            <div
                key='game'
                id='game'
            />
        )
    }
}

export interface GameContainerProps {
    uiStore?: UIStore
    gameStore?: GameStore
}

@inject('uiStore', 'gameStore')
@observer
export default class GameContainer extends React.Component<GameContainerProps, undefined> {
    render() {
        const styles = StyleSheet.create({
            gameContainer: {
                width: '100%',
                height: '100%',
            }
        })
        return (
            <div className={css(styles.gameContainer)}>
                <Game
                    width={this.props.uiStore.width}
                    height={this.props.uiStore.height}
                    game={this.props.gameStore.game}
                />
            </div>
        )
    }
}
