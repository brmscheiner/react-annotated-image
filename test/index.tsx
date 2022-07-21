import ReactDOM from 'react-dom';
import React, { useState } from 'react';

import AnnotatedImage from '../src/AnnotatedImage';
import AnnotationToolbar from '../src/AnnotationToolbar';
import { CreateMode } from '../src';
import '../src/ReactCrop.scss';

function App() {
  const [imgSrc, setImgSrc] = useState('');
  const [createMode, onChangeCreateMode] = useState(CreateMode.Rect);
  const [rects, setRects] = useState([]);
  const [lines, setLines] = useState([]);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  return (
    <div className="App">
      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      {Boolean(imgSrc) && (
        <AnnotatedImage
          src={imgSrc}
          createMode={createMode}
          rects={rects}
          onCreateRect={(_, allRects) => setRects(allRects)}
          lines={lines}
          onCreateLine={(_, allLines) => setLines(allLines)}
          width={800}
        />
      )}
      <AnnotationToolbar createMode={createMode} onChangeCreateMode={onChangeCreateMode} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
