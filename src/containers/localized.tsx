import { inject, observer } from 'mobx-react'
import * as React from 'react'

import { L10NStore } from '../stores/l10nStore'

export interface LocalizedProps {
    l10nStore: L10NStore
}

export default function localized(
    WrappedComponent: React.StatelessComponent<any> | React.ComponentClass<any>
) {
    return inject('l10nStore')(
        observer((props: any) => {
            const { l10nStore, ...otherProps } = props
            const store: L10NStore = l10nStore
            return <WrappedComponent l10n={store.dictionary} {...otherProps} />
        })
    )
}
