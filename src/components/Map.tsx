import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

import { Room, Edge, Direction, gameDoors, adjacentRooms } from '../config/map'

const roomWidth = 90
const roomHeight = 90

const doorWidth = 30
const doorHeight = 30

const margin = 0
const parentOffset = 1

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        right: 200,
        top: 200,
    },
    room: {
        position: 'absolute',
        width: roomWidth,
        height: roomHeight,
        backgroundColor: 'black',
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
        top = roomHeight + (doorHeight / 2) - parentOffset
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

const roomStyle = (position: RoomPosition) => {
    const { top, left } = position
    const roomStyle = {
        roomPosition: {
            top,
            left,
        }
    }
    return StyleSheet.create(roomStyle)
}

export interface DoorProps {
    direction: Direction,
}

const DoorView = ({ direction }: DoorProps) =>
    <div
        className={css(styles.doorBase, doorStyle(direction).doorPosition)}
        onClick={() => console.log('door')}
    >
    </div>

export interface RoomProps {
    position: RoomPosition
    doors: Edge[],
}

const RoomView = ({position, doors}: RoomProps) =>
    <div className={css(styles.room, roomStyle(position).roomPosition)}>
        { doors.map((edge, i) => <DoorView key={i} direction={edge.direction}/> ) }
    </div>

interface RoomNode {
    node: Room,
    parent: RoomNode | null,
    position: RoomPosition
}

const roomNode = (node: Room, parent: RoomNode | null, position: RoomPosition): RoomNode => ({ node, parent, position })

const Map = (): JSX.JSXElement => {
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