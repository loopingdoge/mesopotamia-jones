import { inject, observer } from 'mobx-react'
import * as React from 'react'

import Inventory from '../components/Inventory'

import { GameStore } from '../stores/gameStore'

interface InventoryContainerProps {
    gameStore?: GameStore
}

@inject('gameStore')
@observer
export default class InventoryContainer extends React.Component<
    InventoryContainerProps
> {
    render() {
        return <Inventory inventory={this.props.gameStore.inventory} />
    }
}
