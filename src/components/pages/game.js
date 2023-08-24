import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Crafting from '../Crafting';
import itemMapping from '../itemMapping';
import { PacmanLoader } from "react-spinners";

function Game() {  
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  const [selectedItemSlot1, setSelectedItemSlot1] = useState(null);
  const [selectedItemSlot2, setSelectedItemSlot2] = useState(null);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleItemSelect = (item) => {
    if (!selectedItemSlot1) {
      setSelectedItemSlot1(item);
    } else if (!selectedItemSlot2) {
      setSelectedItemSlot2(item);
    }
  };

  const resetSlots = () => {
    setSelectedItemSlot1(null);
    setSelectedItemSlot2(null);
  };

  const handleHomeClick = () => {
    setShowConfirmation(true);
  };

  const confirmGoHome = () => {
    // Redirect to the home page or take any other action
    setShowConfirmation(false);
  };

  const cancelGoHome = () => {
    setShowConfirmation(false);
  };

  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading for 3 seconds (adjust the duration as needed)
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  
    // Clear the timeout when the component unmounts
    return () => clearTimeout(loadingTimeout);
  }, []);  

  return (
  <div id="game-page" className={`nes-container flex-grow-1 m-1`} style={{ backgroundImage: 'url("./assets/background/ybg.jpg")', backgroundSize: '100% 100%' }}>
    {/* Main Game Components */}
    <div className="row">
        {/* MENU BUTONS */}
        <div className="col-md-3 p-1">
          <div className="btn-group custom-menu">
            <button className="cta-button nes-btn my-3" onClick={handleHomeClick}>
              Home
            </button>
            <Link to="#" className="cta-button nes-btn my-3">
              Settings
            </Link>
            <Link to="#" className="cta-button nes-btn my-3">
              Credits
            </Link>
          </div>
        </div>

        {/* Crafting UI */}
        <div className="col-md-6">
          <Crafting
            selectedItemSlot1={selectedItemSlot1}
            selectedItemSlot2={selectedItemSlot2}
            items={items}
            setItems={setItems}
            resetSlots={resetSlots}
            itemMapping={itemMapping}
          />
        </div>

        {/* INVENTORY */}
        <div className="col-md-3" style={{ backgroundImage: 'url("./assets/background/framebg.png")', backgroundSize: '100% 100%', paddingTop: '40px', paddingBottom: '50px' }}>
          <div className="scrollable-container">
            <div className="row py-4">
              {items.map((item, index) => (
                <div className="col" key={index}>
                  <div
                    className="container my-4 item-list-item is-pointer"
                    onClick={() => handleItemSelect(item)}
                  >
                    <img
                      src={`/assets/sprites/items/${itemMapping[item]}`}
                      alt={item}
                      width={"100px"}
                      height={"100px"}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>

    {/* Display loading spinner when isLoading is true */}
    {isLoading && (
       <div className={`loading-spinner ${isLoading ? '' : 'hidden'}`}>
        <PacmanLoader color={"#ffffff"} size={50} />
      </div>    
    )}

    {/* Confirmation overlay */}
    {showConfirmation && (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="nes-container is-dark with-title is-centered">
            <p className="title">Confirmation</p>
            <p>Are you sure you want to go home?</p>
            <Link to="/" className="cta-button nes-btn my-3" onClick={confirmGoHome}>
              Go Home
            </Link>
            <button className="nes-btn" onClick={cancelGoHome}>
              Back to Game
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default Game;