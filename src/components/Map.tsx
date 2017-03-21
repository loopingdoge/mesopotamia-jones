import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

import gameStore from '../stores/gameStore'
import { Room, Edge, Direction, gameDoors, adjacentRooms } from '../config/map'
import { Riddle } from '../config/riddles'

const roomWidth = 90
const roomHeight = 90

const doorWidth = 30
const doorHeight = 30

const margin = 0
const parentOffset = 1

const styles = StyleSheet.create({
    map: {
        position: 'relative',
        left: -100,
        top: 0,
    },
    room: {
        position: 'absolute',
        width: roomWidth,
        height: roomHeight,
        boxSizing: 'border-box',
        border: '1px solid white',
    },
    doorBase: {
        position: 'absolute',
        width: doorWidth,
        height: doorHeight,
        backgroundColor: 'brown',
        border: '2px solid white',
        zIndex: 1,
    }
})

const doorStyle = (direction: Direction) => {
    let top, left: number = 0
    if (direction === Direction.TOP) {
        top = 0 - (doorHeight / 2) - parentOffset
        left = (roomWidth / 2) - (doorWidth / 2) - parentOffset
    } else if (direction === Direction.RIGHT) {
        top = (roomHeight / 2) - (doorHeight / 2) - parentOffset
        left = roomWidth - (doorWidth / 2) - parentOffset
    } else if (direction === Direction.BOTTOM) {
        top = roomHeight - (doorHeight / 2) - parentOffset
        left = (roomWidth / 2) - (doorWidth / 2) - parentOffset
    } else { // LEFT
        top = (roomHeight / 2) - (doorHeight / 2) - parentOffset
        left = 0 - (doorWidth / 2) - parentOffset
    }
    const doorStyle = {
        doorPosition: {
            top,
            left,
        }
    }
    return StyleSheet.create(doorStyle)
}

interface RoomPosition {
    top: number
    left: number
}

const roomPosition = (prevPosition: RoomPosition, direction: Direction): RoomPosition => {
    const prevTop = prevPosition.top
    const prevLeft = prevPosition.left
    let top, left: number = 0
    if (direction === Direction.TOP) {
        top = prevTop - roomHeight - margin
        left = prevLeft
    } else if (direction === Direction.RIGHT) {
        top = prevTop
        left = prevLeft + roomWidth + margin
    } else if (direction === Direction.BOTTOM) {
        top = prevTop + roomHeight + margin
        left = prevLeft
    } else { // LEFT
        top = prevTop
        left = prevLeft - roomWidth - margin
    }
    return { top, left }
}

const roomStyle = (position: RoomPosition, gameRoom: Room, currentRoom: Room) => {
    const { top, left } = position
    const roomStyle = {
        roomPosition: {
            top,
            left,
            backgroundColor: gameRoom.id === currentRoom.id ? 'white' : 'black',
        }
    }
    return StyleSheet.create(roomStyle)
}

// roomStyle with fixed gameRoom
const gameRoomStyle = (position: RoomPosition, currentRoom: Room) => roomStyle(position, gameStore.room, currentRoom)

export interface DoorProps {
    direction: Direction,
    onMapDoorClick: () => void
}

const DoorView = ({ direction, onMapDoorClick }: DoorProps) =>
    <div
        className={css(styles.doorBase, doorStyle(direction).doorPosition)}
        onClick={ onMapDoorClick }
    >
    </div>

export interface RoomProps {
    position: RoomPosition
    doors: Edge[]
    currentRoom: Room,
    onMapDoorClick: (riddle: Riddle) => void
}

const RoomView = ({position, doors, currentRoom, onMapDoorClick}: RoomProps) =>
    <div className={css(styles.room, gameRoomStyle(position, currentRoom).roomPosition)}>
        { doors.map((edge, i) => <DoorView key={i} direction={edge.direction} onMapDoorClick={ () => onMapDoorClick(edge.riddle) } /> ) }
    </div>

interface RoomNode {
    node: Room,
    parent: RoomNode | null,
    position: RoomPosition
}

const roomNode = (node: Room, parent: RoomNode | null, position: RoomPosition): RoomNode => ({ node, parent, position })


export interface MapProps {
    onMapDoorClick: (riddle: Riddle) => void
}

const Map = ({onMapDoorClick}: MapProps) => {
    const firstRoom = gameDoors[0].from
    const visited: any = {}
    const queue: RoomNode[] = []
    const roomComponents: JSX.JSXElement[] = []
    let count = 0

    visited[firstRoom.id] = true
    const roomnode = roomNode(firstRoom, null, { left: 0, top: 0 })

    queue.push(roomnode)

    while (queue.length > 0) {
        const current = queue.shift()

        const edges = adjacentRooms(current.node).filter(edge => !visited[edge.to.id])

        const roomComponent =
            <RoomView
                key={count++}
                position={current.position}
                doors={edges}
                currentRoom={current.node}
                onMapDoorClick={onMapDoorClick}
            />

        roomComponents.push(roomComponent)

        edges.forEach(edge => {
            const toRoom = edge.to
            if (!visited[toRoom.id]) {
                visited[toRoom.id] = true
                queue.push(roomNode(toRoom, current, roomPosition(current.position, edge.direction)))
            }
        })
    }

    return (
        <div className={css(styles.map)}>
            {roomComponents}
        </div>
    )
}

export default Map