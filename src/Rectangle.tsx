import React, { useCallback, useRef, useEffect, useState } from 'react';
import { baseLineStyles, baseRectStyles, drawingLineStyles, drawingRectStyles } from './styles';
import { Rect, Line, Zoom, CreateMode, Coords } from './types';
import useDrag from './useDrag';

interface RectangleProps {
  x1: number
  y1: number
  x2?: number
  y2?: number
  w?: number
  h?: number
  style: React.CSSProperties
}

export default function Rectangle(props: RectangleProps) {
  const {
    x1,
    y1,
    x2,
    y2,
    w,
    h,
    style,
    ...rest
  } = props;

  console.log(props);

  /* Rect dimensions can be provided in the form (x1, y1), (x2, y2)
   * or (x1, y1) (w, h). Negative widths and heights are handled. */
  let x, y, width, height;
  if (x2 && y2) {
    x = Math.min(x1, x2);
    width = Math.abs(x1 - x2);
    y = Math.min(y1, y2);
    height = Math.abs(y1 - y2);
  } else if (w && h) {
    x = w > 0 ? x1 : x1 + w;
    y = h > 0 ? y1 : y1 + h;
    width = w > 0 ? w : -w;
    height = h > 0 ? h : -h;
  }

  return <rect 
  style={{ ...baseRectStyles, ...style }}
  x={x}
  y={y}
  width={width}
  height={height}
   {...rest} 
   />
}