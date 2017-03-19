import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'

import { GameStore } from '../stores/gameStore'
import { UIStore, GAME, MAP, BLUEP } from '../stores/gameUIStore'
import { Riddle } from '../config/riddles'

import Editor from './Editor'
import Map from './Map'

const styles = StyleSheet.create({
    editorSection: {
        margin: 20,
    }
})

export interface EditorSectionProps {
    code: string
    onUserCodeInput: (code: string) => void
    height: number
    width: number
}

const EditorSection = ({ code, onUserCodeInput, height, width }: EditorSectionProps) =>
    <div className={css(styles.editorSection)}>
        <Editor
            code={code}
            onUserCodeInput={onUserCodeInput}
            height={height - 90 + 'px'}
            width={width - 40 + 'px'}
        />
    </div>

interface InventoryProps {
    gameStore?: GameStore
    uiStore?: UIStore
    width: number
    onMapDoorClick: (riddle: Riddle) => void
    selectedRiddle: Riddle
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        placeholder: {
            height: '80%',
            width: '80%',
            backgroundColor: '#fff',
            border: '5px solid #eee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
        }
    })

    render() {
        const selected = this.props.uiStore && this.props.uiStore.state.selected
        const { show } = this.props.uiStore
        const { width, onMapDoorClick, selectedRiddle } = this.props
        const height = width / 1.77

        const style = StyleSheet.create({
            inventoryWrapper: {
                position: 'absolute',
                height,
                width,
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
                            <Map onMapDoorClick={ onMapDoorClick }/>
                        </div>
                        <div className={css(this.styles.inventoryContent)}>
                            {
                                selectedRiddle ? 
                                    <EditorSection code={ selectedRiddle.userCode() } onUserCodeInput={() => console.error('TODO')} height={height} width={width / 2} />
                                :
                                    <div className={css(this.styles.placeholder)}>
                                        Clicca una porta per iniziare ad editare
                                    </div>
                            }
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
        const { width, onMapDoorClick } = this.props.uiStore
        const { selected, selectedRiddle } = this.props.uiStore.state // per forzare il trigger di render

        return (
            <Inventory gameStore={this.props.gameStore} uiStore={this.props.uiStore} width={width} onMapDoorClick={onMapDoorClick} selectedRiddle={selectedRiddle} />
        )
    }
}

export default InventoryContainer