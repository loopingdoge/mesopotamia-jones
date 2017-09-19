import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import BlocklyEditor from './BlocklyEditor'
import Map from './Map'

import { getToolbox } from '../config/inventory'
import { Riddle } from '../config/riddles'

import { GameStore } from '../stores/gameStore'

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flex: 1
    },
    gameOverlayContent: {
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

interface MapWrapperProps {
    selectedRiddle: Riddle
    onMapDoorClick: (riddle: Riddle) => void
    gameStore?: GameStore
}

export default class MapWrapper extends React.PureComponent<MapWrapperProps> {
    workspaceChange = (workspace: string) => {
        // TODO: Invece che salvare ogni volta bisognerebbe mettere un bottone
        this.props.gameStore.setRiddleWorkspaceXML(
            this.props.selectedRiddle.id,
            workspace
        )
    }

    render() {
        const { selectedRiddle, onMapDoorClick, gameStore } = this.props
        return (
            <div className={css(styles.wrapper)}>
                <div className={css(styles.gameOverlayContent)}>
                    <Map onMapDoorClick={onMapDoorClick} />
                </div>
                <div className={css(styles.editorContainer)}>
                    {selectedRiddle
                        ? <BlocklyEditor
                              toolboxXML={getToolbox([])}
                              workspaceXML={gameStore.getRiddleWorkspaceXML(
                                  selectedRiddle.id
                              )}
                              onWorkspaceChange={this.workspaceChange}
                          />
                        : <div className={css(styles.placeholder)}>
                              Seleziona una porta per vedere la tua soluzione
                          </div>}
                </div>
            </div>
        )
    }
}
