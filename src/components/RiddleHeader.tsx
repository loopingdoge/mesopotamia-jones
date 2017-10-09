import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'

import { Icon } from 'react-icons-kit'
import { androidRefresh, chevronLeft, help } from 'react-icons-kit/ionicons/'

import strings from '../config/strings'

import Button from './Button'

const styles = StyleSheet.create({
    riddleHeader: {
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

export interface RiddleHeaderProps {
    goBack: () => void
    openInfo: () => void
}

const RiddleHeader = ({ goBack, openInfo }: RiddleHeaderProps) => (
    <div className={css(styles.riddleHeader)}>
        <Button icon={chevronLeft} text={strings.back} onClick={goBack} />
        <div className={css(styles.spacer)} />
        <Button icon={help} text={strings.help} onClick={openInfo} />
    </div>
)

export default RiddleHeader
