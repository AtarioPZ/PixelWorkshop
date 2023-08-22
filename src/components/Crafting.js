import React from 'react';

function Crafting({ selectedItemSlot1, selectedItemSlot2, items, setItems, resetSlots, itemMapping }) {
    const handleCrafting = () => {
        if (selectedItemSlot1 && selectedItemSlot2) {
          let newItem = '';
          // Crafting logic based on selected items in the slots
          if (selectedItemSlot1 === 'Item 2' && selectedItemSlot2 === 'Item 2') {
            newItem = 'Item 5'; // Craft "Item 2" (water) + "Item 2" (water) into "Item 5" (bubble potion)
          }
          else if ((selectedItemSlot1 === 'Item 1' && selectedItemSlot2 === 'Item 2') || (selectedItemSlot1 === 'Item 2' && selectedItemSlot2 === 'Item 1')){
            newItem = 'Item 6'; // Craft "Item 1" (fire) + "Item 2" (water) into "Item 5" (steam)
          }
      
          if (newItem) {
            setItems((prevItems) => [...prevItems, newItem]);
            // Reset both slots to null
            if (selectedItemSlot1 === selectedItemSlot2) {
              resetSlots();
            } else {
              resetSlots();
              resetSlots();
            }
          }
        }
      };
      

  return (
    <div className="nes-container p-3">
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
