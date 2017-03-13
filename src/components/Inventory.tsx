import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

import { GameStore } from '../stores/gameStore'


interface InventoryProps {
    gameStore?: GameStore
}


class Inventory extends React.Component<InventoryProps, void> {

    selected: number = null

    styles = StyleSheet.create({
        inventoryWrapper: {
            position: 'absolute',
            height: '100%',
            width: '100%',
        },
        inventoryHeader: {
            zIndex: 20,
            position: 'relative',
            height: 50,
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.25)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        item: {
            width: 40,
            height: 40,
            marginLeft: 10,
            backgroundColor: 'red',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inventoryWindow: {
            zIndex: 19,
            position: 'relative',
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)',
        }
    })

    render() {
        return (
            <div className={css(this.styles.inventoryWrapper)} >
                <div className={css(this.styles.inventoryHeader)} >
                    <button className={css(this.styles.item)}>A</button>
                    <button className={css(this.styles.item)}>B</button>
                </div>
                {
                    this.selected ?
                        <div className={css(this.styles.inventoryWindow)} >
                            Ah questo e' l'inventario?
                        </div>
                    :
                    null
                }
            </div>
        )
    }
}

export default Inventory