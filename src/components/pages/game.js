import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../common/header';
import Footer from '../common/footer';
import { Link } from 'react-router-dom';


function Game() {
  const location = useLocation();

  return (
    <div className="nes-container flex-grow-1 m-4" style={{ backgroundImage: 'url("./assets/background/ybg.jpg")' }}>
      <div className="row">
        {location.pathname !== '/game' && <Header />}
        {location.pathname !== '/game' && <Footer />}

        <div className="col-md-3 p-2">
          {/* Menu */}
          <div className="btn-group-vertical">
            <Link to="/" className="cta-button nes-btn my-3">Home</Link>
            <Link to="#" className="cta-button nes-btn my-3">Settings</Link>
            <Link to="#" className="cta-button nes-btn my-3">Credits</Link>
          </div>
        </div>

        <div className="col-md-6">
          {/* Crafting */}
          <div className="nes-container p-3" style={{ backgroundImage: 'url("./assets/background/ybg.jpg")' }}>
            <div className="d-flex flex-column py-5">
              <div className="d-flex justify-content-center align-items-center py-5">
                <img src="./assets/sprites/circle.png" alt="Item 1" width={"100px"} height={"100px"}/>
                <img src="./assets/sprites/combine.png" alt="combine" width={"50px"} height={"50px"}/>
                <img src="./assets/sprites/circle.png" alt="Item 2" width={"100px"} height={"100px"}/>
              </div>
              <button className="nes-btn mt-2">Craft</button>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          {/* Items */}
          <div className="row">
            <div className="col-md-6">
              <div className="nes-container m-1">
                <p>Item 1</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="nes-container m-1">
                <p>Item 2</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="nes-container m-1">
                <p>Item 3</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="nes-container m-1">
                <p>Item 4</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
