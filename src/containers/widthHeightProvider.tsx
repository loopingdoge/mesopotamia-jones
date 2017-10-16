import { inject, observer } from 'mobx-react'
import * as React from 'react'

import { UIStore } from '../stores/gameUIStore'

export default function widthHeightProvider(
    WrappedComponent: React.StatelessComponent<any> | React.ComponentClass<any>
) {
    return inject('uiStore')(
        observer((props: any) => {
            const { uiStore, ...otherProps } = props
            return (
                <WrappedComponent
                    width={props.uiStore.width}
                    height={props.uiStore.height}
                    {...otherProps}
                />
            )
        })
    )
}
