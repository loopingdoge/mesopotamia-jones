import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { Icon } from 'react-icons-kit'
import { androidRefresh, chevronLeft, help } from 'react-icons-kit/ionicons/'

import Button from './Button'

const styles = StyleSheet.create({
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        padding: '5px 10px 0px 10px'
    },
    spacer: {
        flex: 1
    }
})

export interface ToolbarProps {
    goBack: () => void
    openInfo: () => void
}

const Toolbar = ({ goBack, openInfo }: ToolbarProps) =>
    <div className={css(styles.toolbar)}>
        <Button icon={chevronLeft} text={'Indietro (1)'} onClick={goBack} />
        <div className={css(styles.spacer)} />
        <Button icon={help} text={'Aiuto  (2)'} onClick={openInfo} />
    </div>

export default Toolbar
