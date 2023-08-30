import React, { useState, useEffect } from 'react';

import MiniGame from './minigame';

function Crafting({ selectedItemSlot1, selectedItemSlot2, items, setItems, resetSlots, itemMapping, setSelectedItemSlot1, setSelectedItemSlot2, onCraftingStart, onCraftingEnd, }) {  
  const arraysEqual = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };
  
  const [isMiniGameActive, setIsMiniGameActive] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [craftingFailed, setCraftingFailed] = useState(false);
  const [combinationNotFound, setCombinationNotFound] = useState(false);
  const [craftingRecipes, setCraftingRecipes] = useState([]);

  const handleCrafting = () => {
    if (selectedItemSlot1 && selectedItemSlot2) {
      let craftingSuccess = false; // Track crafting success

      // Check if there's a matching recipe
      for (const recipe of craftingRecipes) {
        if (
          (arraysEqual([selectedItemSlot1, selectedItemSlot2], recipe.ingredients.sort()) ||
            arraysEqual([selectedItemSlot2, selectedItemSlot1], recipe.ingredients.sort()))
        ) {
          setSelectedRecipe(recipe); // Store the selected recipe
          setIsMiniGameActive(true); // Activate the mini-game
          craftingSuccess = true;
          break;
        }
      }

      // If recipe does not exist, show modal
      if (!craftingSuccess) {
        setCombinationNotFound(true);
      } else {
        // Notify the parent component (Game) that crafting has started
        onCraftingStart();
      }
    }
  };

  const handleSlotClick = (slotNumber) => {
    if (slotNumber === 1) {
      // Reset Slot 1
      setSelectedItemSlot1(null);
    } else if (slotNumber === 2) {
      // Reset Slot 2
      setSelectedItemSlot2(null);
    }
  };

  const handleMiniGameFailure = () => {    
    setIsMiniGameActive(false);
    setCraftingFailed(true);
    onCraftingEnd(false);
  };

  const handleMiniGameSuccess = () => {
    const newItem = selectedRecipe.result;

    // Check if the item already exists in the items list
    if (!items.includes(newItem)) {
      setItems((prevItems) => [...prevItems, newItem]);
    }

    // Reset both slots to null
    resetSlots();
    resetSlots();

    // Deactivate the mini-game
    setIsMiniGameActive(false);
    onCraftingEnd(true);
  };

  const closeModal = () => {    
    // Reset both slots to null when the modal is closed
    resetSlots();    
    setCraftingFailed(false);
    setCombinationNotFound(false);
  };

  useEffect(() => {
    // Make a fetch request to your API endpoint for crafting recipes
    fetch('https://pixelapi-fsg7.onrender.com/api/recipe')
      .then((response) => response.json())
      .then((data) => {
        // Set the fetched crafting recipes to the state variable
        setCraftingRecipes(data);
      })
      .catch((error) => {
        console.error('Error fetching crafting recipes:', error);
      });
  }, []);

  return (
    <div className="crafting-container">
      {/* Overlay UI for Crafting Failure */}
      {craftingFailed && (
        <div className="modal-overlay">
          <div className="nes-container is-dark with-title is-centered">
            <p className="title">Crafting Error</p>
            <p>Crafting failed</p>
            <button className="nes-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Overlay UI for Combination Failure */}
      {combinationNotFound && (
        <div className="modal-overlay">
          <div className="nes-container is-dark with-title is-centered">
            <p className="title">Crafting Error</p>
            <p>Combination not found.</p>
            <button className="nes-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Crafting components */}
      <div className="nes-container rounded-4 p-3" style={{ backgroundImage: 'url("./assets/background/ybg.jpg")', backgroundSize: '100% 100%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.9)' }}>
        <div className="d-flex flex-column py-5">
          {/* Display the selected items in the Crafting component */}
          <div className="crafting-elements py-5">
            <div className="nes-container rounded-4 slot" onClick={() => handleSlotClick(1)}>
              {selectedItemSlot1 ? (
                <div className='nes-cursorbtn'>
                  <img
                  src={`/assets/sprites/items/${itemMapping[selectedItemSlot1]}`}
                  alt={selectedItemSlot1}
                  width={"100px"}
                  height={"100px"}
                  />
                </div>
              ) : (
                <div className="crafting-slot">Slot 1</div>
              )}
            </div>
            <div className="combine-image">
              <img
                src="./assets/sprites/combine.png"
                alt="combine"
                width={"50px"}
                height={"50px"}
              />
            </div>
            <div className="nes-container rounded-4 slot" onClick={() => handleSlotClick(2)}>
              {selectedItemSlot2 ? (
                <div className='nes-cursorbtn'>
                  <img
                  src={`/assets/sprites/items/${itemMapping[selectedItemSlot2]}`}
                  alt={selectedItemSlot2}
                  width={"100px"}
                  height={"100px"}
                  />
                </div>                
              ) : (
                <div className="crafting-slot">Slot 2</div>
              )}
            </div>
          </div>

          {/* Craft button */}
          <button className="nes-btn mt-2 nes-cursorbtn" onClick={handleCrafting}>
            Craft
          </button>

          {/* Render the mini-game if it's active */}
          {isMiniGameActive && (
            <div className="minigame-overlay">
              <div className="mini-game-container">
                <MiniGame
                  selectedItemSlot1={selectedItemSlot1}
                  selectedItemSlot2={selectedItemSlot2}
                  onCraftingSuccess={handleMiniGameSuccess}
                  onCraftingFailure={handleMiniGameFailure}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Crafting;
