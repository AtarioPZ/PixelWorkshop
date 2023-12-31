import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Crafting from '../Crafting';
import itemMapping from '../itemMapping';
import { PacmanLoader } from "react-spinners";
import AudioPlayer from '../AudioPlayer'; 

function Game() {
  const [apiData, setApiData] = useState([]);
  const [isMiniGameActive, setIsMiniGameActive] = useState(false);

  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  
  const [selectedItemSlot1, setSelectedItemSlot1] = useState(null);
  const [selectedItemSlot2, setSelectedItemSlot2] = useState(null);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCreditsOverlay, setShowCreditsOverlay] = useState(false);  


  const [showSettingsOverlay, setShowSettingsOverlay] = useState(false);  
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const [musicVolume, setMusicVolume] = useState(50);

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
    setShowConfirmation(false);
  };

  const cancelGoHome = () => {
    setShowConfirmation(false);
  };

  const toggleCreditsOverlay = () => {
    setShowCreditsOverlay(!showCreditsOverlay);
  };  

  const toggleSettingsOverlay = () => {
    setShowSettingsOverlay(!showSettingsOverlay);
  };   
  
  const toggleMusic = () => {
    setIsMusicEnabled(!isMusicEnabled);
  };
  
  const handleMusicVolumeChange = (event) => {
    setMusicVolume(event.target.value);
  };
  

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Make a fetch request to your API endpoint
    fetch('https://pixelapi-fsg7.onrender.com/api/itemsData')
      .then((response) => response.json())
      .then((data) => {
        // Set the fetched data to the state variable
        setApiData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  useEffect(() => {
    // Simulate loading for 3 seconds
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Clear the timeout when the component unmounts
    return () => {
      clearTimeout(loadingTimeout);
    }
  }, []);

  return (
    <div id="game-page" className={`nes-container flex-grow-1 m-1`} style={{ backgroundImage: 'url("./assets/background/ybg.jpg")', backgroundSize: '100% 100%' }}>
      {/* Audio Player */}
      <AudioPlayer isMusicEnabled={isMusicEnabled} musicVolume={musicVolume} />

      {/* Main Game Components */}      
      <div className="row">
        {/* MENU BUTTONS */}
        <div className="col-md-3 p-1">
          <div className="btn-group custom-menu">
            <button className="cta-button nes-btn my-3" onClick={handleHomeClick}>
              Home
            </button>
            <button className="cta-button nes-btn my-3" onClick={toggleSettingsOverlay}>
              Settings
            </button>
            <button className="cta-button nes-btn my-3" onClick={toggleCreditsOverlay}>
              Credits
            </button>
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
            setSelectedItemSlot1={setSelectedItemSlot1}
            setSelectedItemSlot2={setSelectedItemSlot2}
            // Pass isMiniGameActive and functions to handle it
            isMiniGameActive={isMiniGameActive}
            onCraftingStart={() => setIsMiniGameActive(true)}
            onCraftingEnd={(success) => setIsMiniGameActive(false)}
          />
        </div>

        {/* INVENTORY */}        
        <div className="col-md-3" style={{ backgroundImage: 'url("./assets/background/framebg.png")', backgroundSize: '100% 100%', paddingTop: '40px', paddingBottom: '50px' }}>          
          <div className='title' style={{ textAlign: 'center' }}>
            <h3 style={{ margin: '0' }}>I N V E N T O R Y</h3>
          </div>
          <div className="scrollable-container">
            <div className="row py-4">
              {isMiniGameActive ? ( // Check if the crafting is active
                <p className="text-center">Crafting in progress...</p>
              ) : (
                // If not crafting, display initial inventory items
                items.map((itemName, index) => {
                  const itemData = apiData.find(item => item.name === itemName); // Find the item data from the API
                  
                  return (
                    <div className="col nes-cursorbtn" key={index}>
                      <div
                        className="container my-4 item-list-item"
                        onClick={() => handleItemSelect(itemName)}
                      >
                        <img
                          src={`/assets/sprites/items/${itemMapping[itemName]}`}
                          alt={itemName}
                          width={"100px"}
                          height={"100px"}
                        />
                        <p className='title'>{itemData ? itemData.realName : 'Unknown'}</p>
                        
                        {/* Custom box for the item description */}
                        <div className="custom-box">
                          <img
                            src={`/assets/sprites/items/${itemMapping[itemName]}`}
                            alt={itemName}
                            width={"100px"}
                            height={"100px"}
                          />
                          {itemData ? itemData.description : 'Description not available'} {/* Display the fetched description or a placeholder */}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
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

      {/* Credits overlay */}
      {showCreditsOverlay && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title">Credits</p>
              
              <p>Pixel Sprites: Generated by <a href="https://openai.com/dall-e-2" target="_blank" rel="noopener noreferrer">DALL-E</a></p>
              <p>  Retro Font: <a href="https://www.fontspace.com/digibra-font-f76859" target="_blank" rel="noopener noreferrer">Digibra</a> by Authentype</p>
              <button className="nes-btn" onClick={toggleCreditsOverlay}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings */}
      {showSettingsOverlay && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title">Settings</p>
              <div className="d-flex justify-content-between">
                <label>Enable Music</label>
                <label>
                  <input type="checkbox" checked={isMusicEnabled} onChange={toggleMusic} />
                </label>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <label>Volume</label>
                <label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={musicVolume}
                    onChange={handleMusicVolumeChange}
                  />
                </label>
              </div>
              
              <div className="text-center mt-3">
                <button className="nes-btn" onClick={toggleSettingsOverlay}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
