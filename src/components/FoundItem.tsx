import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import * as React from 'react'

import { Item } from '../config/inventory'
import widthHeightProvider from '../containers/widthHeightProvider'
import { GameStore } from '../stores/gameStore'
import { UIStore } from '../stores/gameUIStore'

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '8px 64px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemDescription: {
        display: 'flex',
        flexDirection: 'row',
        fontFamily: 'Arvo',
        color: '#FFF',
        fontSize: 24
    },
    itemName: {
        marginLeft: 6,
        fontWeight: 600
    }
})

export interface FoundItemProps {
    item: Item
    width: number
    height: number
}

const FoundItem = ({ item, width, height }: FoundItemProps) => {
    const imageStyle = {
        backgroundImage: `url(${item.image})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: Math.floor(width / 100 * 20),
        height: Math.floor(height / 100 * 40),
        marginBottom: '16px'
    }

    return (
        <div className={css(styles.wrapper)}>
            <div style={imageStyle} />
            <div className={css(styles.itemDescription)}>
                <div>You found a</div>
                <div className={css(styles.itemName)}>
                    {item.name}
                </div>
            </div>
        </div>
    )
}

export default widthHeightProvider(FoundItem)
