import * as React from 'react'
import { Provider } from 'mobx-react'
import { StyleSheet } from 'aphrodite'
import { Router, Route, hashHistory, createMemoryHistory } from 'react-router'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'

import gameStore from '../stores/gameStore'
import Home from './Home'
import Game from './Game'
import Riddle from './Riddle'

const routingStore = new RouterStore()

const stores = { gameStore, routingStore }

// const history= createMemoryHistory()
const storeHistory = syncHistoryWithStore(hashHistory, routingStore)

const styles = StyleSheet.create({
    appContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    }
})

export default class App extends React.Component<void, void> {

    render() {
        return (
            <Provider {...stores}>
                <Router history={storeHistory}>
                    <Route path='/' component={Home} />
                    <Route path='/riddle' component={Riddle} />
                </Router>
            </Provider>
        )
    }

}