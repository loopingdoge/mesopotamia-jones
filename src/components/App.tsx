declare const __DEV__: boolean
import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import * as React from 'react'
import { Route, Switch } from 'react-router'

import Home from './Home'
import MesopotamiaJones from './MesopotamiaJones'

const styles = StyleSheet.create({
    appContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    }
})

export default class App extends React.Component {
    render() {
        return (
            <div className={css(styles.appContainer)}>
                <DevTools />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/game" component={MesopotamiaJones} />
                </Switch>
            </div>
        )
    }
}
