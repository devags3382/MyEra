import React from 'react';
import { Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

const StickerImage = ({ imageUrl, x, y, width, height, isSelected, onSelect, onChange }) => {
  const [image] = useImage(imageUrl);

  return (
    <KonvaImage
      image={image}
      x={x}
      y={y}
      width={width}
      height={height}
      draggable
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(e) => {
        onChange({
          x: e.target.x(),
          y: e.target.y()
        });
      }}
    />
  );
};

export default StickerImage;
