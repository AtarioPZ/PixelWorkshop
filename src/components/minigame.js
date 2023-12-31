import React, { useState, useEffect, useCallback } from 'react';

const elements = [
  { name: 'fire', image: '/assets/sprites/items/fire.png' },
  { name: 'water', image: '/assets/sprites/items/water.png' },
  { name: 'earth', image: '/assets/sprites/items/earth.png' },
  { name: 'wind', image: '/assets/sprites/items/wind.png' },
];
const elementWidth = 100;
const containerWidth = elements.length * elementWidth;
const chances = 3;

function MiniGame({ onCraftingSuccess, onCraftingFailure }) {
  const [targetElement, setTargetElement] = useState(elements[0]); 
  const [ballPosition, setBallPosition] = useState(0);
  const [chancesLeft, setChancesLeft] = useState(chances);

  const selectRandomElement = () => {
    const randomIndex = Math.floor(Math.random() * elements.length);
    return elements[randomIndex];
  };

  const startNewRound = useCallback(() => {
    const newTargetElement = selectRandomElement();
    setTargetElement(newTargetElement);
    setBallPosition(0); // Reset the ball position
  }, []);

  const handleCraftClick = () => {
    // Determine the correct selection of the element when the ball is at its current position
    const selectedElementIndex = Math.floor(ballPosition / elementWidth);
    const selectedElement = elements[selectedElementIndex];

    if (selectedElement.name === targetElement.name) {
      onCraftingSuccess();
    } else {
      setChancesLeft(chancesLeft - 1);
      if (chancesLeft <= 1) {
        onCraftingFailure();
      }
    }
  };

  useEffect(() => {
    startNewRound();
  }, [startNewRound]);

  useEffect(() => {
    // Move the ball smoothly along the line
    const interval = setInterval(() => {
      setBallPosition((prevPosition) =>
        prevPosition + elementWidth >= containerWidth
          ? 0
          : prevPosition + elementWidth
      );
    }, 1000 / elements.length); // Animation speed

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="minigame-overlay">
      <div className="minigame-container">
        <div className="minigame-title">Select correct element</div>
        <div className='p-3'>{targetElement.name}</div>
        <div className="elements-container rounded" style={{ width: `${containerWidth}px`, overflow: 'hidden', position: 'relative', }}>
          {elements.map((element, index) => (
            <div
              key={element.name}
              className={`element-button ${
                element.name === targetElement.name ? 'target-element' : ''
              }`}
              style={{
                width: `${elementWidth}px`,
                height: `${elementWidth}px`,
                backgroundImage: `url(${element.image})`,
                backgroundSize: '100% 100%',
                transition: 'transform 0.5s ease',              
                zIndex: element.name === targetElement.name ? 1 : 'auto',
                position: 'relative',
              }}
            >
              {/* Transparent pseudo-element overlay for hitbox */}
              <div
                className="element-hitbox"
                style={{
                  width: `${elementWidth}px`,
                  height: `${elementWidth}px`,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  opacity: 0, // Transparent
                  cursor: 'pointer',
                }}
                onClick={handleCraftClick}
              />
            </div>
          ))}
          <div
            className="ball"
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: 'red',
              borderRadius: '50%',
              position: 'absolute',
              top: '50%',
              transition: 'left 2s linear',
              animation: 'moveBall 2s linear infinite',
              animationDirection: 'alternate',
            }}
          />
        </div>      
        <p>Chances Left: {chancesLeft}</p>
        <button className="nes-btn" onClick={handleCraftClick}>
          Craft
        </button>
      </div>
    </div>
  );
}

export default MiniGame;
