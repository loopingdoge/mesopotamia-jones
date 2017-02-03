import * as React from 'react'
import { Provider } from 'mobx-react'

import gameStore from '../stores/gameStore'
import Hello from './Hello'
import Game from './Game'

const stores = { gameStore }

export default class App extends React.Component<void, void> {

    render() {
        return (
            <Provider {...stores}>
                <div>
                    <Hello />
                    <Game />
                </div>
            </Provider>
        )
    }

}