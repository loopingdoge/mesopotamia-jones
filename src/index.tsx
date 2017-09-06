import createHashHistory from 'history/createHashHistory'
import { Provider } from 'mobx-react'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Route, Router } from 'react-router'

import registerServiceWorker from './utils/registerServiceWorker'
import App from './components/App'
import gameStore from './stores/gameStore'
import uiStore from './stores/gameUIStore'
import riddleStore from './stores/riddleStore'
import riddleUIStore from './stores/riddleUIStore'

const routingStore = new RouterStore()

gameStore.init(riddleStore, uiStore)

const stores = { gameStore, routingStore, riddleStore, riddleUIStore, uiStore }

const hashHistory = createHashHistory()
const history = syncHistoryWithStore(hashHistory, routingStore)

ReactDOM.render(
    <Provider {...stores}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('app')
)
registerServiceWorker()
