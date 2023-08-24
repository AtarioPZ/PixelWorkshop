import React from 'react';
import { Link } from 'react-router-dom';

function PlayNow() {
  return (
    <div className="d-flex flex-grow-1 p-3">
      <section className="intro nes-container with-title text-center flex-grow-1">
        <h2 className="title mb-4">Welcome to Pixel Workshop</h2>
        
        {/* Center the content both horizontally and vertically */}
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 mb-3'>
              <div
                style={{
                  background: 'url("/assets/background/bg.png")',
                  backgroundSize: 'cover',
                  opacity: 0.9, 
                  width: '300px', 
                  height: '300px',
                  borderRadius: '20px',
                  boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)', 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >               
              </div>
            </div>

            {/* Right Column - Game Instructions */}
            <div className='col-md-6'>
              <div className='nes-container with-title text-center'>
                <h3 className="title">How to Play</h3>
                <p>
                  Combine two elements or items to create exciting new items. Unleash your power to craft various new items.
                </p>

                {/* Add a call-to-action button */}
                <Link to="/game" className="nes-btn is-primary mt-4">
                  Launch Game
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PlayNow;
