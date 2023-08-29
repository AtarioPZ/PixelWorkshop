import React from 'react';
import { Link } from 'react-router-dom';

function PlayNow() {
  return (
    <div className="d-flex flex-grow-1 p-3">
      <section className="intro nes-container with-title flex-grow-1 rounded">
        <h2 className="title mb-4">Welcome to Pixel Workshop</h2>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 mb-3 d-flex align-items-center justify-content-center'>
              <div
                style={{
                  background: 'url("/assets/background/bg.png")',
                  backgroundSize: 'cover',
                  opacity: 0.9, 
                  width: '300px', 
                  height: '300px',
                  borderRadius: '20px',
                  boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
                }}
                className="d-flex align-items-center justify-content-center"
              >
                <div className="d-flex flex-column align-items-center justify-content-center h-100">
                  <Link to="/game" className="nes-btn is-primary mt-4">
                    Launch Game
                  </Link>
                </div>
              </div>              
            </div>

            <div className='col-md-6'>
              <div className='nes-container with-title rounded'  style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
              <h3 className="title rounded p-1">How to Play</h3>
                <div className='py-3'>                
                  <p>
                    Combine two elements or items to create exciting new items. Unleash your power to craft various new items and read their goofy personalities.
                  </p>
                </div>
              </div>           

              <div className='nes-container mt-4 with-title rounded'  style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
                <h3 className='title rounded p-1'>For the Best Experience:</h3>
                <div className='py-3'>
                  <ul>
                    <li>Use a desktop device.</li>
                    <li>Ensure your browser is up-to-date.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PlayNow;
