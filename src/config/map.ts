import { coord2Pixel } from '../phaser/config'
import Hammurtossi from '../phaser/sprites/Hammurtossi'
import Npc from '../phaser/sprites/Npc'
import VonTalin from '../phaser/sprites/VonTalin'
import riddles, { Riddle } from './riddles'

export interface Door {
    id: string
    room1: Room
    room2: Room
    riddle: Riddle
}

export interface Room {
    id: string
    npcs: Npc[]
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

function direction({ x, y }: GameDoor): Direction {
    // tslint:disable:curly
    if (x === 7 && y === 0) return Direction.TOP
    else if (x === 15 && y === 4) return Direction.RIGHT
    else if (x === 7 && y === 8) return Direction.BOTTOM
    else if (x === 0 && y === 4) return Direction.LEFT
    else return null
    // tslint:enable:curly
}

const door = (id: string, room1: Room, room2: Room, riddle: Riddle): Door => ({
    id,
    room1,
    room2,
    riddle
})

const gameDoor = (
    door: Door,
    from: Room,
    to: Room,
    x: number,
    y: number
): GameDoor => ({ door, from, to, x, y })

const room = (id: string, npcs: Npc[]): Room => ({ id, npcs })

const edge = (direction: Direction, to: Room, riddle: Riddle) => ({
    direction,
    to,
    riddle
})

export const rooms: Room[] = [
    room('room1', []),
    room('room2', []),
    room(
        'room3',
        [
            // new VonTalin(this.game, coord2Pixel(7.5), coord2Pixel(2))
        ]
    ),
    room('room4', []),
    room(
        'room5',
        [
            // new Hammurtossi(this.game, coord2Pixel(7.5), coord2Pixel(2))
        ]
    )
]

export const doors: Door[] = [
    door('door1', rooms[0], rooms[1], riddles[0]),
    door('door2', rooms[1], rooms[2], riddles[1]),
    door('door3', rooms[1], rooms[3], riddles[2]),
    door('door4', rooms[3], rooms[4], riddles[3]),
    door('door5', rooms[4], rooms[5], riddles[4])
]

export const gameDoors: GameDoor[] = [
    gameDoor(doors[0], rooms[0], rooms[1], 15, 4),
    gameDoor(doors[0], rooms[1], rooms[0], 0, 4),
    gameDoor(doors[1], rooms[1], rooms[2], 7, 0),
    gameDoor(doors[1], rooms[2], rooms[1], 7, 8),
    gameDoor(doors[2], rooms[1], rooms[3], 15, 4),
    gameDoor(doors[2], rooms[3], rooms[1], 0, 4),
    gameDoor(doors[3], rooms[3], rooms[4], 15, 4),
    gameDoor(doors[3], rooms[4], rooms[3], 0, 4)
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
            edge(direction(gameDoor), gameDoor.to, gameDoor.door.riddle)
        )
