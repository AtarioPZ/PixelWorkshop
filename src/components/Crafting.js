import React, { useState } from 'react';
import craftingRecipes from './CraftingRecipes';
import MiniGame from './minigame';

function Crafting({ selectedItemSlot1, selectedItemSlot2, items, setItems, resetSlots, itemMapping, setSelectedItemSlot1, setSelectedItemSlot2 }) {  
  const arraysEqual = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };
  
  const [isMiniGameActive, setIsMiniGameActive] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [craftingFailed, setCraftingFailed] = useState(false);
  const [combinationNotFound, setCombinationNotFound] = useState(false);

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
  };

  const closeModal = () => {    
    // Reset both slots to null when the modal is closed
    resetSlots();    
    setCraftingFailed(false);
    setCombinationNotFound(false);
  };

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
      <div className="nes-container rounded-4 p-3" style={{ backgroundImage: 'url("./assets/background/ybg.jpg")', backgroundSize: '100% 100%' }}>
        <div className="d-flex flex-column py-5">
          {/* Display the selected items in the Crafting component */}
          <div className="crafting-elements py-5">
            <div className="nes-container rounded-4 slot" onClick={() => handleSlotClick(1)}> {/* Add onClick handler */}
              {selectedItemSlot1 ? (
                <img
                  src={`/assets/sprites/items/${itemMapping[selectedItemSlot1]}`}
                  alt={selectedItemSlot1}
                  width={"100px"}
                  height={"100px"}
                />
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
            <div className="nes-container rounded-4 slot" onClick={() => handleSlotClick(2)}> {/* Add onClick handler */}
              {selectedItemSlot2 ? (
                <img
                  src={`/assets/sprites/items/${itemMapping[selectedItemSlot2]}`}
                  alt={selectedItemSlot2}
                  width={"100px"}
                  height={"100px"}
                />
              ) : (
                <div className="crafting-slot">Slot 2</div>
              )}
            </div>
          </div>

          {/* Craft button */}
          <button className="nes-btn mt-2" onClick={handleCrafting}>
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
