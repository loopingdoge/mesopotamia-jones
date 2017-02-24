import riddles, { Riddle } from './riddles'

export interface Door {
    id: string
    room1: Room
    room2: Room
    riddle: Riddle
}

export interface Room {
    id: string
}

export interface GameDoor {
    door: Door,
    from: Room,
    to: Room,
    x: number,
    y: number
}

const door = (id: string, room1: Room, room2: Room, riddle: Riddle): Door => ({id, room1, room2, riddle})

const gameDoor = (door: Door, from: Room, to: Room, x: number, y: number): GameDoor => ({door, from, to, x, y})

const room = (id: string): Room => ({id})

export const rooms: Room[] = [
    room('room1'),
    room('room2'),
    room('room3'),
]

export const doors: Door[] = [
    door('door1', rooms[0], rooms[1], riddles[0]),
    door('door2', rooms[1], rooms[2], riddles[1]),
]

export const gameDoors: GameDoor[] = [
    gameDoor(doors[0], rooms[0], rooms[1], 15, 4),
    gameDoor(doors[0], rooms[1], rooms[0], 0, 4),
    gameDoor(doors[1], rooms[1], rooms[2], 7, 0),
    gameDoor(doors[1], rooms[2], rooms[1], 7, 8),
]

export const getRoomById = (id: string): Room => rooms[+id.substr(id.lastIndexOf('m') + 1) - 1]

/** Returns a function used to get the gameDoor the user touched */
const isGameDoorInRoom = (room: Room, x: number, y: number) =>
    (gameDoor: GameDoor) => (gameDoor.from.id === room.id) && (gameDoor.x === x && gameDoor.y === y)

export const getGameDoor = (room: Room, x: number, y: number): GameDoor =>
    gameDoors
        .filter(isGameDoorInRoom(room, x, y))[0]

const isGameDoorIdInRoom = (door: Door, room: Room) =>
    (gameDoor: GameDoor) => (gameDoor.door.id === door.id && gameDoor.from.id === room.id )

export const getGameDoorById = (door: Door, room: Room) => 
    gameDoors
        .filter(isGameDoorIdInRoom(door, room))[0]

export const nextRoom = (room: Room, x: number, y: number): Room =>
    getGameDoor(room, x, y)
        .to

export const nextRiddle = (room: Room, x: number, y: number): Riddle =>
    getGameDoor(room, x, y)
        .door
        .riddle