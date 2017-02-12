declare const __DEV__: boolean
import * as React from 'react'
import { Provider } from 'mobx-react'
import { css, StyleSheet } from 'aphrodite'
import { Router, Route, hashHistory, /* createMemoryHistory */ } from 'react-router'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import DevTools from 'mobx-react-devtools'

import gameStore from '../stores/gameStore'
import uiStore from '../stores/uiStore'
import riddleStore from '../stores/riddleStore'
import riddleUIStore from '../stores/riddleUIStore'
import Home from './Home'
import Game from './Game'
import Riddle from './Riddle'

const routingStore = new RouterStore()

gameStore.setRoutingStore(routingStore)

const stores = { gameStore, routingStore , riddleStore, riddleUIStore, uiStore }

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
            <div className={css(styles.appContainer)}>
                <Provider {...stores}>
                    <Router history={storeHistory}>
                        <Route path='/' component={Home} />
                        <Route path='/riddle' component={Riddle} />
                        <Route path='/game' component={Game} />
                    </Router>
                </Provider>
                <DevTools />
            </div>
        )
    }

}