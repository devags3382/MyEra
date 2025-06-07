import React from 'react';

const UndoRedo = ({ onUndo, onRedo, canUndo, canRedo }) => {
  return (
    <div style={{ marginTop: 10 }}>
      <button onClick={onUndo} disabled={!canUndo} style={{ marginRight: 10 }}>
        Undo
      </button>
      <button onClick={onRedo} disabled={!canRedo}>
        Redo
      </button>
    </div>
  );
};

export default UndoRedo;
