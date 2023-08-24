import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../common/header';
import Footer from '../common/footer';
import { Link } from 'react-router-dom';
import Crafting from '../Crafting'; // Import the merged Crafting component
import itemMapping from '../itemMapping';

function Game() {
  const location = useLocation();
  
  // Initialize the items state with the first 4 items
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  
  // Initialize the selected slots to the first 2 items
  const [selectedItemSlot1, setSelectedItemSlot1] = (useState(null));
  const [selectedItemSlot2, setSelectedItemSlot2] = useState(null);

  // Handle item selection for crafting slots
  const handleItemSelect = (item) => {
    if (!selectedItemSlot1) {
      setSelectedItemSlot1(item);
    } else if (!selectedItemSlot2) {
      setSelectedItemSlot2(item);
    }
  };

  // Function to reset both slots
  const resetSlots = () => {
    setSelectedItemSlot1(null);
    setSelectedItemSlot2(null);
  };

  return (
    <div className="nes-container flex-grow-1 m-1" style={{ backgroundImage: 'url("./assets/background/ybg.jpg")', backgroundSize: '100% 100%' }}>
      <div className="row">
        {location.pathname !== '/game' && <Header />}
        {location.pathname !== '/game' && <Footer />}

        <div className="col-md-3 p-1">
          {/* Menu */}
          <div className="btn-group custom-menu">
            <Link to="/" className="cta-button nes-btn my-3">
              Home
            </Link>
            <Link to="#" className="cta-button nes-btn my-3">
              Settings
            </Link>
            <Link to="#" className="cta-button nes-btn my-3">
              Credits
            </Link>
          </div>
        </div>

        <div className="col-md-6">
          {/* Crafting */}
          <Crafting
            selectedItemSlot1={selectedItemSlot1}
            selectedItemSlot2={selectedItemSlot2}
            items={items}
            setItems={setItems}
            resetSlots={resetSlots}
            itemMapping={itemMapping} // Pass itemMapping as a prop
          />
        </div>

        <div className="col-md-3" style={{ backgroundImage: 'url("./assets/background/framebg.png")', backgroundSize: '100% 100%', paddingTop: '40px', paddingBottom: '50px' }}>
        {/* Items */}
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
    </div>
  );
}

export default Game;
