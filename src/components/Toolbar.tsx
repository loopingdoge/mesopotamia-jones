import { css, StyleSheet } from 'aphrodite'
import * as React from 'react'
import { Icon } from 'react-icons-kit'
import { androidRefresh, chevronLeft, help } from 'react-icons-kit/ionicons/'

const styles = StyleSheet.create({
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        border: '1px solid black'
    },
    customButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        padding: 10
    },
    spacer: {
        flex: 1
    }
})

export interface BackButtonSectionProps {
    goBack: () => void
}

const BackButtonSection = ({ goBack }: BackButtonSectionProps) => (
    <div>
        <button onClick={goBack} className={css(styles.customButton)}>
            <Icon icon={chevronLeft} />
            {'Back'}
        </button>
    </div>
)

export interface ToolbarButtonProps {
    action: () => void
    icon: any
    text: string
}

const ToolbarButton = ({ action, icon, text }: ToolbarButtonProps) => (
    <div>
        <button onClick={action} className={css(styles.customButton)}>
            <Icon icon={icon} />
            {text}
        </button>
    </div>
)

export interface ToolbarProps {
    goBack: () => void
    openInfo: () => void
}

const Toolbar = ({ goBack, openInfo }: ToolbarProps) => (
    <div className={css(styles.toolbar)}>
        <BackButtonSection goBack={goBack} />
        <div className={css(styles.spacer)} />
        {/*<ToolbarButton
            action={() => console.log('TODO')}
            icon={androidRefresh}
            text={'Clear'}
        />*/}
        <ToolbarButton action={openInfo} icon={help} text={'Help'} />
    </div>
)

export default Toolbar
