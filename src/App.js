import React, { useState, useEffect, useRef } from 'react';
import StickerCanvas from './components/StickerCanvas';
import UndoRedo from './components/UndoRedo';

const LOCAL_STORAGE_KEY = 'myera-stickers';

const App = () => {
  const [stickers, setStickers] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);

  // Save stickers to localStorage on change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stickers));
  }, [stickers]);

  // Load stickers from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) setStickers(JSON.parse(saved));
  }, []);

  // Manage history for undo/redo
  useEffect(() => {
    if (historyStep === -1) {
      setHistory([stickers]);
      setHistoryStep(0);
    } else if (history[historyStep] !== stickers) {
      const newHistory = history.slice(0, historyStep + 1);
      newHistory.push(stickers);
      setHistory(newHistory);
      setHistoryStep(historyStep + 1);
    }
  }, [stickers]);

  const undo = () => {
    if (historyStep > 0) {
      setHistoryStep(historyStep - 1);
      setStickers(history[historyStep - 1]);
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      setHistoryStep(historyStep + 1);
      setStickers(history[historyStep + 1]);
    }
  };

  const exportImage = () => {
    const stage = document.querySelector('canvas');
    if (stage) {
      const dataURL = stage.toDataURL({ pixelRatio: 3 });
      const link = document.createElement('a');
      link.download = 'stickers.png';
      link.href = dataURL;
      link.click();
    }
  };

  const reset = () => {
    setStickers([]);
    setHistory([]);
    setHistoryStep(-1);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>MyEra Sticker App - Internship Task</h2>
      <StickerCanvas stickers={stickers} setStickers={setStickers} />
      <UndoRedo
        onUndo={undo}
        onRedo={redo}
        canUndo={historyStep > 0}
        canRedo={historyStep < history.length - 1}
      />
      <div style={{ marginTop: 15 }}>
        <button onClick={exportImage} style={{ marginRight: 10 }}>
          Export as PNG
        </button>
        <button onClick={reset}>Reset All</button>
      </div>
    </div>
  );
};

export default App;
