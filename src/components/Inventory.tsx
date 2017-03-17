import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'

import { GameStore } from '../stores/gameStore'
import { UIStore, GAME, MAP, BLUEP } from '../stores/gameUIStore'
import { Room } from '../config/map'

import Editor from './Editor'
import Map from './Map'

const styles = StyleSheet.create({
    editorSection: {
        margin: 20,
        height: 'calc( 100% - 40px )',
        width: 'calc( 100% - 40px )',
    }
})

export interface EditorSectionProps {
    code: string
    onUserCodeInput: (code: string) => void
}

const EditorSection = ({ code, onUserCodeInput }: EditorSectionProps) =>
    <div className={css(styles.editorSection)}>
        <Editor
            code={code}
            onUserCodeInput={onUserCodeInput}
        />
    </div>

interface InventoryProps {
    gameStore?: GameStore
    uiStore?: UIStore
    width: number
    height: number
    // onMapDoorClick: (door: GameDoor) => void
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
            backgroundColor: '#E37710',
            fontSize: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inventoryWindow: {
            position: 'absolute',
            zIndex: 19,
            height: 'calc( 100% - 50px)',
            width: '100%',
            backgroundColor: '#E37710',
            paddingTop: 50,
            display: 'flex',
            flexDirection: 'row',
        },
        inventoryContent: {
            width: '50%',
            height: '100%',
            border: '1px solid #a3540b',
            background: 'linear-gradient(135deg, #E37710 22px, #a3540b 22px, #a3540b 24px, transparent 24px, transparent 67px, #a3540b 67px, #a3540b 69px, transparent 69px), linear-gradient(225deg, #E37710 22px, #a3540b 22px, #a3540b 24px, transparent 24px, transparent 67px, #a3540b 67px, #a3540b 69px, transparent 69px)0 64px',
            backgroundColor: '#E37710',
            backgroundSize: '64px 128px',
        }
    })

    render() {
        const selected = this.props.uiStore && this.props.uiStore.state.selected
        const { show } = this.props.uiStore

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
                content = (
                    <div className={css(this.styles.inventoryWindow)} >
                        <div className={css(this.styles.inventoryContent)}>
                            <Map onDoorClick={ (x:Room) => console.warn('COCKCKCKKCLI', x) }/>
                        </div>
                        <div className={css(this.styles.inventoryContent)}>
                            <EditorSection code={'attento che cadi fra salsa wasabi'} onUserCodeInput={()=>console.error('TODO')} />
                        </div>
                    </div>
                )
                break
            case BLUEP:
                content = (
                    <div className={css(this.styles.inventoryWindow)} >
                        <div className={css(this.styles.inventoryContent)}>

                        </div>
                        <div className={css(this.styles.inventoryContent)}>

                        </div>
                    </div>
                )
                break
            case GAME:
                content = null
                break
        }

        return (
            <div className={css(style.inventoryWrapper)} >
                <div className={css(this.styles.inventoryHeader)} >
                    <button className={css(this.styles.item)} onClick={ () => show ( MAP ) }>🗺️</button>
                    <button className={css(this.styles.item)} onClick={ () => show ( BLUEP ) }>💡</button>
                    {
                        selected !== GAME ?
                            <button className={css(this.styles.item)} onClick={ () => show ( GAME ) }>X</button>
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