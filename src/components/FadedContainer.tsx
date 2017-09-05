import { css, StyleSheet } from 'aphrodite'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import * as WebFont from 'webfontloader'

import withWidthHeight from '../containers/widthHeightProvider'
import { GameStore } from '../stores/gameStore'
import { UIStore } from '../stores/gameUIStore'

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.4)',
        backgroundImage:
            'linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.25))',
        zIndex: 100,
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end'
    }
})

export interface FadedContainerProps {
    width?: number
    height?: number
}

class FadedContainer extends React.Component<FadedContainerProps> {
    render() {
        const { width, height } = this.props
        const containerStyle = { width, height }
        return (
            <div className={css(styles.container)} style={containerStyle}>
                {this.props.children}
            </div>
        )
    }
}

export default withWidthHeight(FadedContainer)
