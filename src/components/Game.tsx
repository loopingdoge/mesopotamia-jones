import * as React from 'react'
import PhaserGame from '../phaser'

export default class Game extends React.Component<void, void> {

  game: PhaserGame

  componentDidMount() {
    this.game = new PhaserGame()
    this.game.start()
  }

  render() {
    return <div id='game'></div>
  }

}