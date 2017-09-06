export const rows = 16
export const cols = 9
export const blockSize = 32

export const gameWidth = rows * blockSize
export const gameHeight = cols * blockSize

export const coord2Pixel = (coord: number) => coord * blockSize
