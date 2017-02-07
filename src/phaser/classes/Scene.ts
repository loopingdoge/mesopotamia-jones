import ISprite from './ISprite'

class Scene {
    walls: ISprite[]
    doors: ISprite[]
    player: ISprite

    constructor(walls: ISprite[], doors: ISprite[], player: ISprite) {
        this.walls = walls
        this.doors = doors
        this.player = player
    }
}

export default Scene