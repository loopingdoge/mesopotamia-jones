import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

const styles = StyleSheet.create({
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
        border: '1px solid black',
    },
    spacer: {
        flex: 1,
    }
})

export interface BackButtonSectionProps {
    goBack: () => void
}

const BackButtonSection = ({ goBack }: BackButtonSectionProps) =>
    <div>
        <button onClick={goBack}>{'⬅️'}</button>
    </div>

export interface ToolbarButtonProps {
    action: () => void
    content: string
}

const ToolbarButton = ({ action, content }: ToolbarButtonProps) =>
    <div>
        <button onClick={action}>{content}</button>
    </div>

export interface ToolbarProps {
    goBack: () => void
    openInfo: () => void
}

const Toolbar = ({ goBack, openInfo }: ToolbarProps) =>
    <div className={css(styles.toolbar)}>
        <BackButtonSection goBack={goBack} />
        <div className={css(styles.spacer)}/>
        <ToolbarButton action={() => console.log('TODO')} content={'🔄'} />
        <ToolbarButton action={openInfo} content={'ℹ️️'} />
    </div>

export default Toolbar