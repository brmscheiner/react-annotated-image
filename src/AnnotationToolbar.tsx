import React from 'react';
import { CreateMode } from './types';

export interface AnnotationToolbarProps {
  createMode: CreateMode;
  onChangeCreateMode: (c: CreateMode) => void;
}

const activeStyles = { color: 'blue', padding: 20 };
const inactiveStyles = { color: 'black', padding: 20 };

export default function AnnotationToolbar(props: AnnotationToolbarProps): JSX.Element {
  const { createMode, onChangeCreateMode } = props;
  return (
    <div>
      <button
        style={createMode === CreateMode.Rect ? activeStyles : inactiveStyles}
        onClick={e => {
          if (createMode === CreateMode.Rect) {
            onChangeCreateMode(CreateMode.None);
          } else {
            onChangeCreateMode(CreateMode.Rect);
          }
        }}
      >
        RECT
      </button>
      <button
        style={createMode === CreateMode.Line ? activeStyles : inactiveStyles}
        onClick={() => {
          if (createMode === CreateMode.Line) {
            onChangeCreateMode(CreateMode.None);
          } else {
            onChangeCreateMode(CreateMode.Line);
          }
        }}
      >
        LINE
      </button>
    </div>
  );
}
