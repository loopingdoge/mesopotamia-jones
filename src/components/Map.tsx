import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { adjacentRooms, Direction, Edge, gameDoors, Room } from '../config/map'
import { Riddle } from '../config/riddles'

import gameStore from '../stores/gameStore'

import { onlyIf } from '../utils'

const roomWidth = 90
const roomHeight = 90

const doorWidth = 30
const doorHeight = 30

const margin = 0
const parentOffset = 1

const pulse = {
    '0%': {
        boxShadow:
            'rgba(253, 212, 02, 0.4) 0px 0px 8px, rgba(253, 212, 02, 0) 0px 0px 100px inset'
    },
    '100%': {
        boxShadow:
            'rgba(253, 212, 02, 0.4) 0px 0px 8px, rgba(253, 212, 02, 0.9) 0px 0px 100px inset'
    }
}

const styles = StyleSheet.create({
    map: {
        position: 'relative'
    },
    room: {
        position: 'absolute',
        width: roomWidth,
        height: roomHeight,
        boxSizing: 'border-box',
        border: '1px solid #ce841a',
        backgroundColor: '#fbd688',
        boxShadow: 'beige 0px 0px 5px'
    },
    activeRoom: {
        backgroundColor: '#ff9600',
        border: '1px solid black'
    },
    doorBase: {
        position: 'absolute',
        width: doorWidth,
        height: doorHeight,
        backgroundColor: 'brown',
        border: '1px solid #ce841a',
        zIndex: 1,
        cursor: 'pointer'
    },
    clickableDoor: {
        backgroundColor: '#009200'
    },
    activeDoor: {
        border: '1px solid black',
        animationName: [pulse],
        animationDuration: '.7s',
        animationIterationCount: 'infinite',
        animationDirection: 'alternate',
        animationTimingFunction: 'ease-out'
    }
})

const doorStyle = (direction: Direction) => {
    let top = 0
    let left = 0
    if (direction === Direction.TOP) {
        top = 0 - doorHeight / 2 - parentOffset
        left = roomWidth / 2 - doorWidth / 2 - parentOffset
    } else if (direction === Direction.RIGHT) {
        top = roomHeight / 2 - doorHeight / 2 - parentOffset
        left = roomWidth - doorWidth / 2 - parentOffset
    } else if (direction === Direction.BOTTOM) {
        top = roomHeight - doorHeight / 2 - parentOffset
        left = roomWidth / 2 - doorWidth / 2 - parentOffset
    } else {
        // LEFT
        top = roomHeight / 2 - doorHeight / 2 - parentOffset
        left = 0 - doorWidth / 2 - parentOffset
    }
    const style = {
        doorPosition: {
            top,
            left
        }
    }
    return StyleSheet.create(style)
}

interface RoomPosition {
    top: number
    left: number
}

const roomPosition = (
    prevPosition: RoomPosition,
    direction: Direction
): RoomPosition => {
    const prevTop = prevPosition.top
    const prevLeft = prevPosition.left
    let top = 0
    let left = 0
    if (direction === Direction.TOP) {
        top = prevTop - roomHeight - margin
        left = prevLeft
    } else if (direction === Direction.RIGHT) {
        top = prevTop
        left = prevLeft + roomWidth + margin
    } else if (direction === Direction.BOTTOM) {
        top = prevTop + roomHeight + margin
        left = prevLeft
    } else {
        // LEFT
        top = prevTop
        left = prevLeft - roomWidth - margin
    }
    return { top, left }
}

const roomStyle = (
    position: RoomPosition,
    gameRoom: Room,
    currentRoom: Room
) => {
    const { top, left } = position
    const style = {
        roomPosition: {
            top,
            left
        }
    }
    return StyleSheet.create(style)
}

// roomStyle with fixed gameRoom
const gameRoomStyle = (position: RoomPosition, currentRoom: Room) =>
    roomStyle(position, gameStore.room, currentRoom)

export interface DoorProps {
    direction: Direction
    onMapDoorClick: () => void
    riddleId: string
    hasSolution: boolean
}

const DoorView = ({
    direction,
    onMapDoorClick,
    riddleId,
    hasSolution
}: DoorProps) => (
    <div
        className={css(
            styles.doorBase,
            doorStyle(direction).doorPosition,
            onlyIf(hasSolution, styles.clickableDoor),
            onlyIf(
                gameStore.uiStore.selectedRiddle &&
                    gameStore.uiStore.selectedRiddle.id === riddleId,
                styles.activeDoor
            )
        )}
        onClick={onMapDoorClick}
    />
)

export interface RoomProps {
    position: RoomPosition
    doors: Edge[]
    currentRoom: Room
    onMapDoorClick: (riddle: Riddle) => void
}

const RoomView = ({
    position,
    doors,
    currentRoom,
    onMapDoorClick
}: RoomProps) => (
    <div
        className={css(
            styles.room,
            onlyIf(gameStore.room.id === currentRoom.id, styles.activeRoom),
            gameRoomStyle(position, currentRoom).roomPosition
        )}
    >
        {doors.map((edge, i) => (
            <DoorView
                key={i}
                direction={edge.direction}
                onMapDoorClick={onMapDoorClick.bind(null, edge.riddle)}
                riddleId={edge.riddle.id}
                hasSolution={Boolean(
                    gameStore.getRiddleWorkspaceXML(edge.riddle.id)
                )}
            />
        ))}
    </div>
)

interface RoomNode {
    node: Room
    parent: RoomNode | null
    position: RoomPosition
}

const roomNode = (
    node: Room,
    parent: RoomNode | null,
    position: RoomPosition
): RoomNode => ({ node, parent, position })

export interface MapProps {
    onMapDoorClick: (riddle: Riddle) => void
}

const Map = ({ onMapDoorClick }: MapProps) => {
    const firstRoom = gameDoors[0].from
    const visited: any = {}
    const queue: RoomNode[] = []
    const roomComponents: JSX.Element[] = []
    let count = 0

    visited[firstRoom.id] = true
    const roomnode = roomNode(firstRoom, null, { left: 0, top: 0 })

    queue.push(roomnode)

    while (queue.length > 0) {
        const current = queue.shift()

        const edges = adjacentRooms(current.node).filter(
            edge => !visited[edge.to.id]
        )

        const roomComponent = (
            <RoomView
                key={count++}
                position={current.position}
                doors={edges}
                currentRoom={current.node}
                onMapDoorClick={onMapDoorClick}
            />
        )

        roomComponents.push(roomComponent)

        edges.forEach(edge => {
            const toRoom = edge.to
            if (
                !visited[toRoom.id] &&
                gameStore.state.progression.roomsVisited.find(
                    room => room.id === toRoom.id
                )
            ) {
                visited[toRoom.id] = true
                queue.push(
                    roomNode(
                        toRoom,
                        current,
                        roomPosition(current.position, edge.direction)
                    )
                )
            }
        })
    }

    let negWidth = 0
    let posWidth = 0
    let negHeight = 0
    let posHeight = 0

    roomComponents.forEach(roomComponent => {
        const props: RoomProps = roomComponent.props
        const { top, left } = props.position
        if (negWidth > left && left < 0) {
            negWidth = left
        } else if (posWidth < left && left > 0) {
            posWidth = left
        }

        if (negHeight > top && top < 0) {
            negHeight = top
        } else if (posHeight < top && top > 0) {
            posHeight = top
        }
    })

    const width = Math.abs(negWidth) + posWidth + roomWidth
    const height = Math.abs(negHeight) + posHeight + roomHeight

    return (
        <div
            className={css(styles.map)}
            style={{
                width,
                height,
                top: Math.abs(negHeight),
                left: Math.abs(negWidth)
            }}
        >
            {roomComponents}
        </div>
    )
}

export default Map
