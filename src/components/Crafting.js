import React from 'react';
import craftingRecipes from './CraftingRecipes';

function Crafting({ selectedItemSlot1, selectedItemSlot2, items, setItems, resetSlots, itemMapping }) {
  // Helper function to check if two arrays are equal
  const arraysEqual = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const handleCrafting = () => {
    if (selectedItemSlot1 && selectedItemSlot2) {
      // Crafting logic based on selected items in the slots
      for (const recipe of craftingRecipes) {
        if (
          (arraysEqual([selectedItemSlot1, selectedItemSlot2], recipe.ingredients.sort()) ||
            arraysEqual([selectedItemSlot2, selectedItemSlot1], recipe.ingredients.sort()))
        ) {
          const newItem = recipe.result;
          
          // Check if the item already exists in the items list
          if (!items.includes(newItem)) {
            setItems((prevItems) => [...prevItems, newItem]);
          }

          // Reset both slots to null
          if (selectedItemSlot1 === selectedItemSlot2) {
            resetSlots();
          } else {
            resetSlots();
            resetSlots();
          }

          // Exit the loop since the recipe is found
          return;
        }
      }
    }
  };
  return (
    <div className="nes-container p-3" style={{ backgroundImage: 'url("./assets/background/ybg.jpg")', backgroundSize: '100% 100%' }}>
      <div className="d-flex flex-column py-5">
        {/* Display the selected items in the Crafting component */}
        <div className="d-flex justify-content-center align-items-center py-5">
          {selectedItemSlot1 ? (
            <img
              src={`/assets/sprites/items/${itemMapping[selectedItemSlot1]}`} // Use itemMapping to get the image file name
              alt={selectedItemSlot1}
              width={"100px"}
              height={"100px"}
            />
          ) : (
            <div className="crafting-area-placeholder">Slot 1</div>
          )}
          <img
            src="./assets/sprites/combine.png"
            alt="combine"
            width={"50px"}
            height={"50px"}
          />
          {selectedItemSlot2 ? (
            <img
              src={`/assets/sprites/items/${itemMapping[selectedItemSlot2]}`} // Use itemMapping to get the image file name
              alt={selectedItemSlot2}
              width={"100px"}
              height={"100px"}
            />
          ) : (
            <div className="crafting-area-placeholder">Slot 2</div>
          )}
        </div>
        {/* Craft button */}
        <button className="nes-btn mt-2" onClick={handleCrafting}>
          Craft
        </button>
      </div>
    </div>
  );
}

export default Crafting;
