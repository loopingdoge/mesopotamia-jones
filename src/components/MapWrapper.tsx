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
    workspaceXML: string
    riddleText: string

    componentWillMount() {
        if (this.props.selectedRiddle) {
            this.workspaceXML = this.props.gameStore.getRiddleWorkspaceXML(
                this.props.selectedRiddle.id
            )
        }
    }

    componentWillReceiveProps(nextProps: MapWrapperProps) {
        if (this.props.selectedRiddle != nextProps.selectedRiddle) {
            this.workspaceXML = this.props.gameStore.getRiddleWorkspaceXML(
                nextProps.selectedRiddle.id
            )
            const type =
                nextProps.selectedRiddle.solutionType === 'number'
                    ? 'numero'
                    : 'lettera'
            this.riddleText = nextProps.selectedRiddle.question([
                `${type}1`,
                `${type}2`,
                `${type}3`,
                `${type}4`
            ])
            this.forceUpdate()
        }
    }

    render() {
        const { onMapDoorClick } = this.props
        return (
            <div className={css(styles.wrapper)}>
                <div className={css(styles.gameOverlayContent)}>
                    <Map onMapDoorClick={onMapDoorClick} />
                </div>
                <div className={css(styles.editorContainer)}>
                    {this.workspaceXML
                        ? <BlocklyEditor
                              readonly={true}
                              riddleText={this.riddleText}
                              workspaceXML={this.workspaceXML}
                          />
                        : <div className={css(styles.placeholder)}>
                              Seleziona una porta per vedere la tua soluzione
                          </div>}
                </div>
            </div>
        )
    }
}
