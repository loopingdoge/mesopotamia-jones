import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

const styles = StyleSheet.create({
    sectionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    gameDescription: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    play: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export interface SectionProps {
    startGame: () => void
}

const Section = ({ startGame }: SectionProps) =>
    <div className={css(styles.sectionContainer)}>
        <div className={css(styles.gameDescription)}>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe dolores nostrum, veritatis a, obcaecati in, rem omnis temporibus corrupti distinctio dolore possimus deserunt iusto delectus sunt! Omnis aliquam, nulla sit!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore fugit eos, sint fuga provident nisi. Culpa quas odio ad accusamus impedit, reiciendis mollitia nihil veritatis! Deserunt architecto iure, magnam? Rerum.
            </p>
        </div>
        <div className={css(styles.play)}>
            <button onClick={startGame}>Play</button>
        </div>
    </div>

export default Section