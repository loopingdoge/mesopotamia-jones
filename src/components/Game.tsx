import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'

import { UIStore } from '../stores/uiStore'
import PhaserGame from '../phaser'

export interface GameProps {
    width: number
    height: number
}

export class Game extends React.Component<GameProps, void> {

    game: PhaserGame

    getGameScale = () => {
        let width = 0
        let height = 0
        if (this.props.width < this.props.height) {
            width = this.props.width
            height = (width / 16) * 9
        } else {
            height = this.props.height
            width = (height / 9) * 16
        }
        return { width, height }
    }

    componentDidMount() {
        this.game = new PhaserGame()
        this.game.start()
    }

    render() {
        const { width, height } = this.getGameScale()
        const styles = StyleSheet.create({
            gameContainer: {
                flex: 1,
                width,
                height,
                marginLeft: 'auto',
                marginRight: 'auto',
            }
        })
        return (
            <div
                key='game'
                id='game'
                className={css(styles.gameContainer)}
            />
        )
    }

}

export interface GameContainerProps {
    uiStore?: UIStore
}

@inject('uiStore')
@observer
export default class GameContainer extends React.Component<GameContainerProps, undefined> {
    render() {
        return (
            <Game
                width={this.props.uiStore.width}
                height={this.props.uiStore.height}
            />
        )
    }
}
