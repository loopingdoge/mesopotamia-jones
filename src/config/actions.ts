import { getOrElse, Maybe } from '../utils'

enum Actions {
    SKIP_TO_DIALOGUE_END = 'SKIP_TO_DIALOGUE_END',
    NEXT_DIALOGUE_LINE = 'NEXT_DIALOGUE_LINE',
    CLOSE_ITEM_SCREEN = 'CLOSE_ITEM_SCREEN'
}

type ActionCallback = (event: Event) => any

const callbackMap = new Map<Actions, Maybe<[ActionCallback, boolean]>>()

const callbackIfPressedF = (callback: ActionCallback) => (
    event: KeyboardEvent
) => {
    if (event.key === 'f' || event.key === 'F') {
        callback(event)
    }
}

const eventTouchOrKeyboard = () =>
    'ontouchstart' in window || navigator.msMaxTouchPoints > 0
        ? 'touchend'
        : 'keydown'

export const addActionListener = (
    action: Actions,
    callback: ActionCallback,
    useCapture: boolean = false
) => {
    const event = eventTouchOrKeyboard()
    const newCallback =
        event === 'keydown' ? callbackIfPressedF(callback) : callback
    if (getOrElse(callbackMap.get(action), null)) {
        removeActionListener(action)
    }
    addEventListener(event, newCallback, useCapture)
    callbackMap.set(action, [newCallback, useCapture])
}

export const removeActionListener = (action: Actions) => {
    const callbackTuple = getOrElse(callbackMap.get(action), null)
    if (callbackTuple) {
        const event = eventTouchOrKeyboard()
        removeEventListener(event, callbackTuple[0], callbackTuple[1])
        callbackMap.set(action, null)
    }
}

export default Actions
