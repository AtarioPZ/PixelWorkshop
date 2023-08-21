import React, { useState } from 'react';

function ListItem({ items, setItems, selectedItem, handleItemSelect }) {
  const handleCrafting = () => {
    if (selectedItem) {
      const newItem = 'Crafted Item'; // Replace with your crafting logic
      setItems((prevItems) => [...prevItems, newItem]);
    }
  };

  return (
    <div className="nes-container p-3" style={{ backgroundImage: 'url("./assets/background/ybg.jpg")', backgroundSize: '100% 100%'}}>
      <div className="d-flex flex-column py-5">
        <div className="d-flex justify-content-center align-items-center py-5">
          {/* Crafting UI */}
          {selectedItem ? (
            <img
              src={`./assets/sprites/${selectedItem}.png`} // Assuming your item images have the same name as items in the list
              alt={selectedItem}
              width={"100px"}
              height={"100px"}
            />
          ) : (
            <div className="crafting-area-placeholder">Select an item to craft</div>
          )}
          <img
            src="./assets/sprites/combine.png"
            alt="combine"
            width={"50px"}
            height={"50px"}
          />
          {selectedItem ? (
            <img
              src={`./assets/sprites/${selectedItem}.png`} // Assuming your item images have the same name as items in the list
              alt={selectedItem}
              width={"100px"}
              height={"100px"}
            />
          ) : (
            <div className="crafting-area-placeholder">Select an item to craft</div>
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
