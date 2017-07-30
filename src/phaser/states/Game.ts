import * as Phaser from 'phaser-ce'

import { GameDoor, getGameDoorById } from '../../config/map'
import gameStore, { GAME } from '../../stores/gameStore'
import Dude from '../sprites/Dude'

export default class Game extends Phaser.State {
    player: Phaser.Sprite
    walls: Phaser.Group
    layer: Phaser.TilemapLayer
    lines: Phaser.Line[]

    create() {
        this.game.stage.backgroundColor = '#E37710'
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        const map = this.game.add.tilemap(gameStore.room.id)

        map.addTilesetImage('sheet', 'tiles')

        this.layer = map.createLayer('Livello tile 1')

        map.setCollisionByExclusion(
            [7, 8, 9, 21, 22, 23, 35, 36, 37].map(n => n + 1)
        )

        //  This resizes the game world to match the layer dimensions
        this.layer.resizeWorld()

        let centerX: number = this.world.centerX
        let centerY: number = this.world.centerY

        if (gameStore.lastDoor) {
            const lastDoor: GameDoor = getGameDoorById(
                gameStore.lastDoor,
                gameStore.room
            )
            const lastDoorTile = map.getTile(lastDoor.x, lastDoor.y, this.layer)
            let cX = lastDoorTile.centerX + lastDoorTile.left
            let cY = lastDoorTile.centerY + lastDoorTile.top
            switch (lastDoorTile.properties.direction) {
                case 'top':
                    cY -= lastDoorTile.height
                    break
                case 'left':
                    cX -= lastDoorTile.width
                    break
                case 'bottom':
                    cY += lastDoorTile.height
                    break
                case 'right':
                    cX += lastDoorTile.width
                    break
            }
            centerX = cX || centerX
            centerY = cY || centerY
        }

        this.player = this.game.add.existing(
            new Dude({
                game: this.game,
                x: centerX,
                y: centerY,
                key: 'dude'
            })
        )
    }

    render() {
        // if ('debug') {
        //     this.lines.forEach(line => {
        //         this.game.debug.geom(line)
        //     })
        //     this.game.debug.spriteInfo(this.player, 32, 32)
        //     this.game.debug.body(this.player)
        // }
    }

    update() {
        this.lines = [
            new Phaser.Line(
                this.player.position.x,
                this.player.position.y,
                this.player.position.x,
                this.player.position.y + 30
            ), // down
            new Phaser.Line(
                this.player.position.x,
                this.player.position.y,
                this.player.position.x + 30,
                this.player.position.y
            ), // right
            new Phaser.Line(
                this.player.position.x,
                this.player.position.y,
                this.player.position.x,
                this.player.position.y - 15
            ), // up
            new Phaser.Line(
                this.player.position.x,
                this.player.position.y,
                this.player.position.x - 30,
                this.player.position.y
            ) // left
        ]

        this.game.physics.arcade.collide(
            this.player,
            this.layer,
            null,
            null,
            this
        )

        let nearTiles: Phaser.Tile[] = []

        this.lines.forEach(line => {
            const tiles = this.layer
                .getRayCastTiles(line, 1, true)
                .filter(tile => tile.index === 63 || tile.properties.isDoor)
            nearTiles = [...nearTiles, ...tiles]
        })

        nearTiles.forEach(tile => {
            this.onNearTile(tile)
        })

        if (nearTiles.length === 0) {
            gameStore.removeInteraction()
        }
    }

    reloadRoom() {
        this.game.add.tilemap(gameStore.room.id)
    }

    onNearTile(tile: Phaser.Tile) {
        if (!gameStore.state.dialog) {
            if (tile.index === 63) {
                this.activateDialogue('dialog1')
            }
            if (this.isCollisionWithDoor(tile)) {
                this.activateDoor(tile.x, tile.y)
            }
        }
    }

    isCollisionWithDoor(tile: Phaser.Tile) {
        return tile.properties.isDoor
    }

    activateDialogue(dialogueId: string) {
        gameStore.readyInteraction({ type: 'object', id: dialogueId })
    }

    activateDoor(x: number, y: number) {
        gameStore.readyInteraction({ type: 'door', x, y })
    }
}
