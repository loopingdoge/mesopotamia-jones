import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

import CircularButton from './CircularButton'

const styles = StyleSheet.create({
    separatorVContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: 44,
    },
    separatorHContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 44,
    },
    lineVContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
        padding: '10px',
    },
    lineHContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        padding: '10px',
    },
    line: {
        backgroundColor: '#333',
    },
    vLine: {
        width: 2,
    },
    hLine: {
        height: 2,
    },
})

interface LineProps {
    isVertical: boolean
}

const Line = ({ isVertical }: LineProps) =>
    <div className={css(styles.line, isVertical ? styles.vLine : styles.hLine)}></div>

export interface SeparatorProps {
    isVertical: boolean
    isButtonToggled: boolean
    expanded: boolean
    shrink: () => void
    expand: () => void
}

const Separator = ({ isVertical, isButtonToggled, expanded, shrink, expand }: SeparatorProps) =>
    <div className={css(isVertical ? styles.separatorVContainer : styles.separatorHContainer)}>
        <div className={css(isVertical ? styles.lineVContainer : styles.lineHContainer)}>
            <Line isVertical={isVertical} />
        </div>
        <CircularButton
            onClick={expanded ? shrink : expand}
            toggled={isButtonToggled}
            vertical={isVertical}
        />
        <div className={css(isVertical ? styles.lineVContainer : styles.lineHContainer)}>
            <Line isVertical={isVertical} />
        </div>
    </div>

export default Separator