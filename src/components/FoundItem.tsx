import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import * as React from 'react'

import { Item } from '../config/inventory'
import widthHeightProvider from '../containers/widthHeightProvider'
import { GameStore } from '../stores/gameStore'
import { UIStore } from '../stores/gameUIStore'

export interface FoundItemProps {
    item: Item
    width: number
    height: number
}

const FoundItem = ({ item, width, height }: FoundItemProps) => {
    const imageStyle = {
        backgroundImage: `url(${'https://openclipart.org/image/2400px/svg_to_png/262417/hp-android_smartphone.png'})`,
        width: Math.floor(width / 100 * 20),
        height: Math.floor(height / 100 * 40)
    }

    return (
        <div>
            <div style={imageStyle} />
            <div>
                <div>You found a</div>
                <div>
                    {item.name}
                </div>
            </div>
        </div>
    )
}

export default widthHeightProvider(FoundItem)
