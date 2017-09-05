import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import * as React from 'react'

import { getToolbox } from '../config/inventory'
import { Riddle } from '../config/riddles'
import { GameStore } from '../stores/gameStore'
import { BLUEP, GAME, MAP, UIStore } from '../stores/gameUIStore'

import BlocklyEditor from './BlocklyEditor'
import Map from './Map'

const styles = StyleSheet.create({
    inventoryWrapper: {
        position: 'absolute',
        flexDirection: 'column',
        flex: 1
    },
    editorSection: {
        padding: 20
    },
    inventoryWindow: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: '50px',
        zIndex: 19,
        flex: 1,
        backgroundColor: '#E37710'
    },
    inventoryContent: {
        flex: 1,
        border: '1px solid #a3540b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    placeholder: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
        border: '5px solid #eee',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    editorContainer: {
        display: 'flex',
        flex: 1,
        padding: 20,
        border: '1px solid #a3540b'
    }
})

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

const Inventory = ({
    width,
    height,
    selectedRiddle,
    selected,
    onMapDoorClick,
    gameStore
}: InventoryProps) => {
    let content
    switch (selected) {
        case MAP:
            // console.log(selectedRiddle && selectedRiddle.id)
            content = (
                <div className={css(styles.inventoryWindow)}>
                    <div className={css(styles.inventoryContent)}>
                        <Map onMapDoorClick={onMapDoorClick} />
                    </div>
                    <div className={css(styles.editorContainer)}>
                        {selectedRiddle
                            ? <BlocklyEditor
                                  toolboxXML={getToolbox()}
                                  workspaceXML={gameStore.getRiddleWorkspaceXML(
                                      selectedRiddle.id
                                  )}
                                  onWorkspaceChange={(workspace: string) => {
                                      console.log(selectedRiddle.id)
                                      // TODO: Invece che salvare ogni volta bisognerebbe mettere un bottone
                                      gameStore.setRiddleWorkspaceXML(
                                          selectedRiddle.id,
                                          workspace
                                      )
                                  }}
                                  onCodeRun={() =>
                                      console.warn(
                                          'TODO: implement onCodeRun in Inventory.tsx'
                                      )}
                                  runCode={() =>
                                      console.warn(
                                          'TODO: implement onCodeRun in Inventory.tsx'
                                      )}
                              />
                            : <div className={css(styles.placeholder)}>
                                  Clicca una porta per iniziare ad editare
                              </div>}
                    </div>
                </div>
            )
            break
        case BLUEP:
            content = (
                <div className={css(styles.inventoryWindow)}>
                    <div className={css(styles.inventoryContent)} />
                    <div className={css(styles.inventoryContent)} />
                </div>
            )
            break
        case GAME:
            content = null
            break
    }

    return (
        <div
            className={css(styles.inventoryWrapper)}
            style={{
                width,
                height,
                display: selected === GAME ? 'none' : 'flex'
            }}
        >
            {content}
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
class InventoryContainer extends React.Component<InventoryPropsContainer> {
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
