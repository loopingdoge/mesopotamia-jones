import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'

import { GameStore } from '../stores/gameStore'
import { UIStore, GAME, MAP, BLUEP } from '../stores/gameUIStore'

import Map from './Map'

interface InventoryProps {
    gameStore?: GameStore
    uiStore?: UIStore
    width: number
    height: number
}


class Inventory extends React.Component<InventoryProps, void> {

    selected: string = null

    styles = StyleSheet.create({
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
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)',
        }
    })

    render() {
        const selected = this.props.uiStore && this.props.uiStore.state.selected
        const { showMap, showBluep, showGame } = this.props.uiStore

        const style = StyleSheet.create({
            inventoryWrapper: {
                position: 'absolute',
                height: this.props.width / 1.77,
                width: this.props.width,
                display: 'flex',
                flexDirection: 'column',
            }
        })

        let content: any = null

        switch ( selected ) {
            case MAP:
                content = ( <div className={css(this.styles.inventoryWindow)} >
                        <Map />
                    </div> )
                break
            case BLUEP:
                content = (
                    <div className={css(this.styles.inventoryWindow)} >
                        Ah questo e' il BLUEPRINT?
                </div>)
                break
            case GAME:
                content = null
                break
        }

        return (
            <div className={css(style.inventoryWrapper)} >
                <div className={css(this.styles.inventoryHeader)} >
                    <button className={css(this.styles.item)} onClick={ showMap }>MAP</button>
                    <button className={css(this.styles.item)} onClick={ showBluep }>BLUEP</button>
                    {
                        selected !== GAME ?
                            <button className={css(this.styles.item)} onClick={ showGame }>X</button>
                        :
                            null
                    }
                </div>
                { content }
            </div>
        )
    }
}

interface InventoryPropsContainer {
    gameStore?: GameStore
    uiStore?: UIStore
}


@inject('gameStore', 'uiStore')
@observer
class InventoryContainer extends React.Component<InventoryPropsContainer, undefined> {

    render() {
        const { width, height } = this.props.uiStore
        const { selected } = this.props.uiStore.state // per forzare il trigger di render

        return (
            <Inventory gameStore={this.props.gameStore} uiStore={this.props.uiStore} width={width} height={height} />
        )
    }
}

export default InventoryContainer