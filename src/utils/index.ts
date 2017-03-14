/**
 * Modulo operation which works on negative numbers too
 * @param n The number to be modulated
 * @param modulo The modulo
 */
export function mod (n: number, modulo: number) {
    return ((n % modulo) + modulo) % modulo
}

export function next<T> (list: T[], index: number) {
    return mod(index + 1, list.length)
}

export function prev<T> (list: T[], index: number) {
    return mod(index - 1, list.length)
}

export function initList (length: number) {
    const list = new Array(length)
    for (let i = 0; i < list.length; i ++) list[i] = 0
    return list
}

export type Maybe<T> = T | void