import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import Game from './Game'

const khosrau = {
    fontFamily: 'Cuneiform',
    fontStyle: 'normal',
    fontWeight: 'normal',
    src: 'url(\'../../assets/fonts/Khosrau/Khosrau.otf\') format(\'opentype\')'
}

const styles = StyleSheet.create({
    riddleContainer: {

    },
    cuneiform: {
        fontFamily: khosrau,
        fontSize: 50,
    }
})

const Riddle = () =>
    <div className={css(styles.riddleContainer)}>
        <p className={css(styles.cuneiform)}>
            Bonfante merda
        </p>
        <Game />
    </div>

export default Riddle