import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'

import { GameStore } from '../stores/gameStore'
import { UIStore, GAME, MAP, BLUEP } from '../stores/gameUIStore'
import { Riddle } from '../config/riddles'

import Editor from './Editor'
import Map from './Map'

const styles = StyleSheet.create({
    inventoryWrapper: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    editorSection: {
        padding: 20,
    },
    inventoryWindow: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: '50px',
        zIndex: 19,
        flex: 1,
        backgroundColor: '#E37710',
        background: 'linear-gradient(135deg, #E37710 22px, #a3540b 22px, #a3540b 24px, transparent 24px, transparent 67px, #a3540b 67px, #a3540b 69px, transparent 69px), linear-gradient(225deg, #E37710 22px, #a3540b 22px, #a3540b 24px, transparent 24px, transparent 67px, #a3540b 67px, #a3540b 69px, transparent 69px)0 64px',
        backgroundSize: '64px 128px',
    },
    inventoryContent: {
        flex: 1,
        border: '1px solid #a3540b',
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
    },
})

// --------------------------------------------------------------------------------------
// ----------------------------------- Editor Section -----------------------------------
// --------------------------------------------------------------------------------------

export interface EditorSectionProps {
    code: string
    defaultCode: string
    onUserCodeInput: (code: string) => void
    height: number
    width: number
}

const EditorSection = ({ code, defaultCode, onUserCodeInput, height, width }: EditorSectionProps) =>
    <div className={css(styles.editorSection)}>
        <Editor
            code={code}
            defaultCode={defaultCode}
            onUserCodeInput={onUserCodeInput}
            height={height - 90 + 'px'}
            width={width - 40 + 'px'}
        />
    </div>

// --------------------------------------------------------------------------------------
// -------------------------------------- Inventory -------------------------------------
// --------------------------------------------------------------------------------------

interface InventoryProps {
    width: number
    height: number
    selectedRiddle: Riddle
    selected: string
    onMapDoorClick: (riddle: Riddle) => void
    gameStore?: GameStore
}

const Inventory = ({ width, height, selectedRiddle, selected, onMapDoorClick, gameStore }: InventoryProps) => {
    let content
    switch ( selected ) {
        case MAP:
            content = (
                <div className={css(styles.inventoryWindow)} >
                    <div className={css(styles.inventoryContent)}>
                        <Map onMapDoorClick={ onMapDoorClick }/>
                    </div>
                    <div className={css(styles.inventoryContent)}>
                        {
                            selectedRiddle ?
                                <EditorSection code={ gameStore.getUserCode(selectedRiddle.id) } defaultCode={ selectedRiddle.defaultCode([]) } onUserCodeInput={(code: string) => gameStore.setUserCode(selectedRiddle.id, code) } height={height} width={width / 2} />
                            :
                                <div className={css(styles.placeholder)}>
                                    Clicca una porta per iniziare ad editare
                                </div>
                        }
                    </div>
                </div>
            )
            break
        case BLUEP:
            content = (
                <div className={css(styles.inventoryWindow)} >
                    <div className={css(styles.inventoryContent)}>

                    </div>
                    <div className={css(styles.inventoryContent)}>

                    </div>
                </div>
            )
            break
        case GAME:
            content = null
            break
    }

    return (
        <div className={css(styles.inventoryWrapper)} style={{ width, height }}>
            { content }
        </div>
    )
}

// -------------------------------------------------------------------------------------- //
// -------------------------------------- Container ------------------------------------- //
// -------------------------------------------------------------------------------------- //

interface InventoryPropsContainer {
    gameStore?: GameStore
    uiStore?: UIStore
}

@inject('gameStore', 'uiStore')
@observer
class InventoryContainer extends React.Component<InventoryPropsContainer, undefined> {

    render() {
        const { width, height, onMapDoorClick } = this.props.uiStore
        const { selected, selectedRiddle } = this.props.uiStore.state

        return (
            <Inventory
                width={width}
                height={height}
                onMapDoorClick={onMapDoorClick}
                selectedRiddle={selectedRiddle}
                selected={selected}
                gameStore={this.props.gameStore}
            />
        )
    }
}

export default InventoryContainer