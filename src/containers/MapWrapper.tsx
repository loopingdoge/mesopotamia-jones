import { inject, observer } from 'mobx-react'
import * as React from 'react'

import MapWrapper from '../components/MapWrapper'

import { GameStore } from '../stores/gameStore'
import { UIStore } from '../stores/gameUIStore'

interface MapWrapperContainerProps {
    gameStore?: GameStore
    uiStore?: UIStore
}

@inject('gameStore', 'uiStore')
@observer
export default class MapWrapperContainer extends React.Component<
    MapWrapperContainerProps
> {
    render() {
        return (
            <MapWrapper
                selectedRiddle={this.props.uiStore.selectedRiddle}
                onMapDoorClick={this.props.uiStore.onMapDoorClick}
                gameStore={this.props.gameStore}
            />
        )
    }
}
