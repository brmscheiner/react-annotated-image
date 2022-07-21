export interface Rect {
  id: string | number
  bounds: number[]
  selected?: boolean
  label?: string
  theta?: number
  style?: React.CSSProperties
  className?: string
}

export interface Line {
  id: string | number
  bounds: number[]
  selected?: boolean
  label?: string
  style?: React.CSSProperties
  className?: string
}

export interface Zoom {
  center: number[]
  scale: number
}

export interface Coords {
  x?: number
  y?: number
}

export enum CreateMode {
  Rect = 'rect',
  Line = 'line',
  None = 'none'
}

// OLD


export type XOrds = 'e' | 'w'
export type YOrds = 'n' | 's'
export type XYOrds = 'nw' | 'ne' | 'se' | 'sw'
export type Ords = XOrds | YOrds | XYOrds

export interface Crop {
  x: number
  y: number
  width: number
  height: number
  unit: 'px' | '%'
}

export interface PixelCrop extends Crop {
  unit: 'px'
}

export interface PercentCrop extends Crop {
  unit: '%'
}
