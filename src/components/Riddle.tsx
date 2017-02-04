import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

const khosrau = {
    fontFamily: 'Cuneiform',
    fontStyle: 'normal',
    fontWeight: 'normal',
    src: 'url(\'../../assets/fonts/Khosrau/Khosrau.otf\') format(\'opentype\')'
}

const styles = StyleSheet.create({
    riddleContainer: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
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
    </div>

export default Riddle