import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'

import { Dialog, Line } from '../config/dialogs'

import { UIStore } from '../stores/uiStore'
import { GameStore, DIALOG } from '../stores/gameStore'
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

export interface DialogProps {
    isVisible: boolean,
    dialog: Dialog,
}

export class DialogUI extends React.Component<DialogProps, void> {

    lineId: number = 0

    render() {
        const styles = StyleSheet.create({
            dialog: {
                position: 'absolute',
                top: 0,
                overflow: 'hidden',
                backgroundColor: 'rgba(0,0,0,0.4)',
            },
            shown: {
                width: '100%',
                height: '100%',
            },
            hidden: {
                width: '100%',
                height: '0%',
            },
            textWrapper: {
                backgroundColor: 'white',
                margin: '10px',
                padding: '10px',
                // width: '',
                borderRadius: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }
        })

        return (
            <div id='dialog' className={css( styles.dialog, this.props.isVisible ? styles.shown : styles.hidden )}>
                <div className={css(styles.textWrapper)}>
                {
                    this.props.dialog ? this.props.dialog.lines[this.lineId].text  : null
                }
                </div>
            </div>
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
                <DialogUI
                    isVisible={ this.props.gameStore.state === DIALOG }
                    dialog={this.props.gameStore.dialog}
                />
            </div>
        )
    }
}
