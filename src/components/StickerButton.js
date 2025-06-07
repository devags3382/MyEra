import React from 'react';

const StickerButton = ({ imgSrc, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        margin: '0 5px',
        padding: 0,
      }}
      title="Add Sticker"
    >
      <img src={imgSrc} alt="sticker" width={50} height={50} />
    </button>
  );
};

export default StickerButton;
