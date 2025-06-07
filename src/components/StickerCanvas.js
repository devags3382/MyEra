import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva';
import useImage from 'use-image';
import { nanoid } from 'nanoid';
import Toolbar from './Toolbar'; // ✅ ✅ ADD THIS LINE

const Sticker = ({ shapeProps, isSelected, onSelect, onChange, onDelete }) => {
  const shapeRef = useRef();
  const trRef = useRef();
  const [image] = useImage(shapeProps.src);

  useEffect(() => {
    if (isSelected) {
      // Attach transformer
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaImage
        image={image}
        x={shapeProps.x}
        y={shapeProps.y}
        width={shapeProps.width}
        height={shapeProps.height}
        rotation={shapeProps.rotation}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // Reset scale to 1
          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // Set new width and height
            width: Math.max(20, node.width() * scaleX),
            height: Math.max(20, node.height() * scaleY),
            rotation: node.rotation(),
          });
        }}
        onDblClick={onDelete}
      />
      {isSelected && <Transformer ref={trRef} />}
    </>
  );
};

const StickerCanvas = ({ stickers, setStickers }) => {
  const [selectedId, setSelectedId] = useState(null);

  const checkDeselect = (e) => {
    // Deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  const addSticker = (src) => {
    const newSticker = {
      id: nanoid(),
      src,
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      rotation: 0,
    };
    setStickers([...stickers, newSticker]);
  };

  const updateSticker = (newAttrs) => {
    const updated = stickers.map((sticker) =>
      sticker.id === newAttrs.id ? newAttrs : sticker
    );
    setStickers(updated);
  };

  const deleteSticker = (id) => {
    setStickers(stickers.filter((sticker) => sticker.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <>
      <Toolbar onAddSticker={addSticker} />
      <Stage
        width={window.innerWidth * 0.8}
        height={window.innerHeight * 0.7}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        style={{ border: '2px solid #333', background: '#eee' }}
      >
        <Layer>
          {stickers.map((sticker) => (
            <Sticker
              key={sticker.id}
              shapeProps={sticker}
              isSelected={sticker.id === selectedId}
              onSelect={() => setSelectedId(sticker.id)}
              onChange={updateSticker}
              onDelete={() => deleteSticker(sticker.id)}
            />
          ))}
        </Layer>
      </Stage>
    </>
  );
};

export default StickerCanvas;
