import React from 'react';
import StickerButton from './StickerButton';

const stickers = [
  '/stickers/smile.png',
  '/stickers/cool.png',
  '/stickers/heart.png',
  '/stickers/star.png',
];

const Toolbar = ({ onAddSticker }) => {
  return (
    <div style={{ marginBottom: 10 }}>
      {stickers.map((src, i) => (
        <StickerButton key={i} imgSrc={src} onClick={() => onAddSticker(src)} />
      ))}
    </div>
  );
};

export default Toolbar;
