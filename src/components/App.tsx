import * as React from 'react'
import { Provider } from 'mobx-react'
import { StyleSheet } from 'aphrodite'
import { Router, Route, browserHistory } from 'react-router'

import gameStore from '../stores/gameStore'
import Home from './Home'
import Game from './Game'
// import Riddle from './Riddle'

const stores = { gameStore }

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
                <Router history={browserHistory}>
                    <Route path='/' component={Home} />
                    {/*<div className={css(styles.appContainer)}>
                        <Home />
                        <Hello />
                        <Game />
                    </div>*/}
                </Router>
            </Provider>
        )
    }

}