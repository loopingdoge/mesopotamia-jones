import { DOOR_ROCK_REQUIRED } from './dialogues'
import { Item, translator } from './inventory'
import riddles, { Riddle } from './riddles'

export interface ItemDialogue {
    item: Item
    dialogueId: string
}

export interface Door {
    id: string
    room1: Room
    room2: Room
    riddle: Riddle
    itemRequired: ItemDialogue
}

export interface Room {
    id: string
}

export interface GameDoor {
    door: Door
    from: Room
    to: Room
    x: number
    y: number
}

export interface Edge {
    direction: Direction
    to: Room
    riddle: Riddle
}

export enum Direction {
    TOP,
    RIGHT,
    BOTTOM,
    LEFT
}

function directionFromCoords({ x, y }: GameDoor): Direction {
    // tslint:disable:curly
    if (x === 7 && y === 0) return Direction.TOP
    else if (x === 15 && y === 4) return Direction.RIGHT
    else if (x === 7 && y === 8) return Direction.BOTTOM
    else if (x === 0 && y === 4) return Direction.LEFT
    else return null
    // tslint:enable:curly
}

const createDoor = (
    id: string,
    room1: Room,
    room2: Room,
    riddle: Riddle,
    itemRequired: ItemDialogue = null
): Door => ({
    id,
    room1,
    room2,
    riddle,
    itemRequired
})

const createGameDoor = (
    door: Door,
    from: Room,
    to: Room,
    x: number,
    y: number
): GameDoor => ({ door, from, to, x, y })

const createRoom = (id: string): Room => ({ id })

const createEdge = (direction: Direction, to: Room, riddle: Riddle) => ({
    direction,
    to,
    riddle
})

export const rooms: Room[] = [
    createRoom('room1'),
    createRoom('room2'),
    createRoom('room3'),
    createRoom('room4'),
    createRoom('room5'),
    createRoom('room6')
]

export const doors: Door[] = [
    createDoor('door1', rooms[0], rooms[1], riddles[0]),
    createDoor('door2', rooms[1], rooms[2], riddles[1]),
    createDoor('door3', rooms[1], rooms[3], riddles[2], {
        item: translator,
        dialogueId: DOOR_ROCK_REQUIRED
    }),
    createDoor('door4', rooms[3], rooms[4], riddles[3]),
    createDoor('door5', rooms[4], rooms[5], riddles[4]),
    createDoor('door6', rooms[5], rooms[6], riddles[5])
]

export const gameDoors: GameDoor[] = [
    createGameDoor(doors[0], rooms[0], rooms[1], 15, 4),
    createGameDoor(doors[0], rooms[1], rooms[0], 0, 4),
    createGameDoor(doors[1], rooms[1], rooms[2], 7, 0),
    createGameDoor(doors[1], rooms[2], rooms[1], 7, 8),
    createGameDoor(doors[2], rooms[1], rooms[3], 15, 4),
    createGameDoor(doors[2], rooms[3], rooms[1], 0, 4),
    createGameDoor(doors[3], rooms[3], rooms[4], 15, 4),
    createGameDoor(doors[3], rooms[4], rooms[3], 0, 4),
    createGameDoor(doors[4], rooms[4], rooms[5], 7, 0),
    createGameDoor(doors[4], rooms[5], rooms[4], 7, 8)
]

export const getRoomById = (id: string): Room =>
    rooms[+id.substr(id.lastIndexOf('m') + 1) - 1]

/** Returns a function used to get the gameDoor the user touched */
const isGameDoorInRoom = (room: Room, x: number, y: number) => (
    gameDoor: GameDoor
) => gameDoor.from.id === room.id && (gameDoor.x === x && gameDoor.y === y)

export const getGameDoor = (room: Room, x: number, y: number): GameDoor =>
    gameDoors.filter(isGameDoorInRoom(room, x, y))[0]

const isGameDoorIdInRoom = (door: Door, room: Room) => (gameDoor: GameDoor) =>
    gameDoor.door.id === door.id && gameDoor.from.id === room.id

export const getGameDoorById = (door: Door, room: Room): GameDoor =>
    gameDoors.filter(isGameDoorIdInRoom(door, room))[0]

export const nextRoom = (room: Room, x: number, y: number): Room =>
    getGameDoor(room, x, y).to

export const nextRiddle = (room: Room, x: number, y: number): Riddle =>
    getGameDoor(room, x, y).door.riddle

export const adjacentRooms = (currentRoom: Room): Edge[] =>
    gameDoors
        .filter(gameDoor => gameDoor.from.id === currentRoom.id)
        .map(gameDoor =>
            createEdge(
                directionFromCoords(gameDoor),
                gameDoor.to,
                gameDoor.door.riddle
            )
        )
