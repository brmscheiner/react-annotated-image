import React, { useCallback, useRef, useEffect, useState } from 'react';
import { baseLineStyles, baseRectStyles, drawingLineStyles, drawingRectStyles } from './styles';
import { Rect, Line, Zoom, CreateMode, Coords } from './types';
import useDrag from './useDrag';

export interface AnnotatedImageProps {
  src: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  className?: string;
  createMode?: CreateMode;
  onCreateRect?: (r: Rect, allRects: Rect[]) => void;
  onSelectRect?: (e: PointerEvent) => void;
  onDeselectRect?: (e: PointerEvent) => void;
  onEditRect?: (e: PointerEvent) => void;
  onDeleteRect?: (e: PointerEvent) => void;
  canSelectRects?: boolean;
  canDeleteRects?: boolean;
  canEditRects?: boolean;
  rects: Rect[];
  onCreateLine?: (l: Line, allLines: Line[]) => void;
  onSelectLine?: (e: PointerEvent) => void;
  onDeselectLine?: (e: PointerEvent) => void;
  onEditLine?: (e: PointerEvent) => void;
  onDeleteLine?: (e: PointerEvent) => void;
  canSelectLines?: boolean;
  canDeleteLines?: boolean;
  canEditLines?: boolean;
  lines: Line[];
  zoom?: Zoom;
  onZoom?: (e: PointerEvent) => void;
  canZoom?: boolean;
  canFullscreen?: boolean;
  canUseHotkeys?: boolean;
  RectTooltip?: React.ReactNode;
  LineTooltip?: React.ReactNode;
}

interface ImageDimensions {
  w?: number;
  h?: number;
}

export default function AnnotatedImage(props: AnnotatedImageProps): JSX.Element {
  const { src, height, width, createMode, rects, onCreateRect, lines, onCreateLine } = props;

  const svgRef = useRef<SVGElement>(null);
  const [naturalDimensions, setNaturalDimensions] = useState<ImageDimensions>({});

  const convertPixels = useCallback(
    ({ x, y }: Coords) => {
      if (svgRef.current && x && y) {
        const svgDimensions = svgRef.current.getBoundingClientRect();
        return { x: x - svgDimensions.left, y: y - svgDimensions.top };
      }
      return { x, y };
    },
    [svgRef.current],
  );

  useEffect(() => {
    const image = new Image();

    function setDimensions(this: HTMLImageElement) {
      setNaturalDimensions({ w: this.naturalWidth, h: this.naturalHeight });
    }

    image.addEventListener('load', setDimensions);
    image.src = src;

    return () => {
      image.removeEventListener('load', setDimensions);
    };
  }, [src]);

  const onCompleteDrag = useCallback(
    ({ dragStart, dragEnd }) => {
      if (createMode === CreateMode.Rect && onCreateRect) {
        const newRect = {
          id: 'rect',
          bounds: [dragStart.x, dragStart.y, dragEnd.x - dragStart.y, dragEnd.y - dragStart.y],
          selected: true,
          theta: 0,
        };
        console.log(newRect);
        onCreateRect(newRect, [...rects, newRect]);
      } else if (createMode === CreateMode.Line && onCreateLine) {
        const newLine = {
          id: 'line',
          bounds: [dragStart.x, dragStart.y, dragEnd.x, dragEnd.y],
          selected: true,
        };
        onCreateLine(newLine, [...lines, newLine]);
      }
    },
    [createMode, rects, lines],
  );

  const { isDragging, dragStart, current } = useDrag(svgRef, convertPixels, onCompleteDrag);

  if (!naturalDimensions) return <div />; // loading component here...

  const drawingRect = isDragging && createMode === CreateMode.Rect;
  const drawingLine = isDragging && createMode === CreateMode.Line;

  console.log(rects);

  return (
    <svg height={height} width={width} viewBox={`0 0 ${naturalDimensions.w} ${naturalDimensions.h}`} ref={svgRef}>
      <image href={src} x={0} y={0} height="100%" width="100%" />
      {drawingRect && (
        <rect
          x={dragStart.x}
          y={dragStart.y}
          width={100}
          height={100}
          style={{ ...baseRectStyles, ...drawingRectStyles }}
        />
      )}
      {drawingLine && (
        <line
          style={{ ...baseLineStyles, ...drawingLineStyles }}
          x1={dragStart.x}
          y1={dragStart.y}
          x2={current.x}
          y2={current.y}
        />
      )}
      {rects.map(rect => (
        <rect
          key={rect.id}
          style={baseRectStyles}
          x={rect.bounds[0]}
          y={rect.bounds[1]}
          width={rect.bounds[2]}
          height={rect.bounds[3]}
        />
      ))}
      {lines.map(line => (
        <line
          key={line.id}
          style={baseLineStyles}
          x1={line.bounds[0]}
          y1={line.bounds[1]}
          x2={line.bounds[2]}
          y2={line.bounds[3]}
        />
      ))}
    </svg>
  );
}
