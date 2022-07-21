import { useState, useEffect, useRef, RefObject } from 'react';
import { Coords } from './types';

interface CompleteDragArgs {
  dragStart: Coords;
  dragEnd: Coords;
}

const useDrag = (
  ref: RefObject<SVGElement>,
  convertPixels: (c: Coords) => Coords,
  onCompleteDrag: (c: CompleteDragArgs) => void,
) => {
  const [current, setCurrent] = useState({});
  const dragStartRef = useRef({});
  const draggingRef = useRef(false);

  const handlePointerDown = (e: PointerEvent) => {
    draggingRef.current = true;
    dragStartRef.current = convertPixels({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = (e: PointerEvent) => {
    if (draggingRef.current) {
      onCompleteDrag({ dragStart: dragStartRef.current, dragEnd: { x: e.clientX, y: e.clientY } });
      draggingRef.current = false;
    }
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (draggingRef.current) {
      setCurrent(convertPixels({ x: e.clientX, y: e.clientY }));
    }
  };

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('pointerdown', handlePointerDown);
      element.addEventListener('pointerup', handlePointerUp);
      element.addEventListener('pointermove', handlePointerMove);

      return () => {
        element.removeEventListener('mousedown', handlePointerDown);
        element.removeEventListener('mouseup', handlePointerUp);
        element.removeEventListener('mousemove', handlePointerMove);
      };
    }

    return () => {};
  }, [ref, convertPixels]);

  return { dragStart: dragStartRef.current, current, isDragging: draggingRef.current };
};

export default useDrag;
