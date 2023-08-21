import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../common/header';
import Footer from '../common/footer';
import { Link } from 'react-router-dom';
import ListItem from '../ListItem';

function Game() {
  const location = useLocation();
  const [items, setItems] = useState(['Item 1', 'Item 2']);
  const [selectedItem, setSelectedItem] = useState(null);

  // Handle item selection
  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="nes-container flex-grow-1 m-4" style={{ backgroundImage: 'url("./assets/background/ybg.jpg")', backgroundSize: '100% 100%'}}>
      <div className="row">
        {location.pathname !== '/game' && <Header />}
        {location.pathname !== '/game' && <Footer />}

        <div className="col-md-3 p-2">
          {/* Menu */}
          <div className="btn-group-vertical">
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
          <ListItem items={items} setItems={setItems} selectedItem={selectedItem} handleItemSelect={handleItemSelect} />
        </div>

        <div className="col-md-3">
          {/* Items */}
          <div className="row p-2" style={{ backgroundImage: 'url("./assets/background/ui.png")', backgroundSize: '100% 100%' }}>
            {items.map((item, index) => (
              <div className="col-md-6" key={index}>
                <div className="nes-container m-1 my-4">
                  <p
                    className="item-list-item"
                    onClick={() => handleItemSelect(item)}
                  >
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
