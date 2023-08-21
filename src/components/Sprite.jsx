import React from 'react';

function Sprite({ x, y }) {
  const spriteStyle = {
    width: '50px',
    height: '50px',
    backgroundImage: `url(/assets/sprites/model1.png)`,
    backgroundSize: 'cover',
    position: 'absolute',
    left: x,
    top: y,
  };

  return <div style={spriteStyle}></div>;
}

export default Sprite;
