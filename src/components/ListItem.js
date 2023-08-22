import React from 'react';

function ListItem({ items, setItems, selectedItemSlot1, selectedItemSlot2, setSelectedItemSlot1, setSelectedItemSlot2 }) {
  const handleCrafting = () => {
    if (selectedItemSlot1 && selectedItemSlot2) {
      let newItem = '';
      // Crafting logic based on selected items in the slots
      if (selectedItemSlot1 === 'fire' && selectedItemSlot2 === 'water') {
        newItem = 'steam';
      } else if (selectedItemSlot1 === 'water' && selectedItemSlot2 === 'water') {
        newItem = 'bubblepotion';
      }

      if (newItem) {
        setItems((prevItems) => [...prevItems, newItem]);
        // Reset both slots to null
        setSelectedItemSlot1(null);
        setSelectedItemSlot2(null);
      }
    }
  };

  return (
    <div className="nes-container p-3" style={{ backgroundImage: 'url("./assets/background/ybg.jpg")', backgroundSize: '100% 100%' }}>
      <div className="d-flex flex-column py-5">
        <div className="d-flex justify-content-center align-items-center py-5">
          {/* Crafting UI */}
          {selectedItemSlot1 ? (
            <img
              src={`/assets/sprites/items/${selectedItemSlot1}.png`}
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
              src={`/assets/sprites/items/${selectedItemSlot2}.png`}
              alt={selectedItemSlot2}
              width={"100px"}
              height={"100px"}
            />
          ) : (
            <div className="crafting-area-placeholder">Slot 2</div>
          )}
        </div>
        <button className="nes-btn mt-2" onClick={handleCrafting}>
          Craft
        </button>
      </div>
    </div>
  );
}

export default ListItem;
