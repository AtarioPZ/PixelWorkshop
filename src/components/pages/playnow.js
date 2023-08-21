import React from 'react';
import { Link } from 'react-router-dom';

function PlayNow() {
  return (
    <div className="d-flex flex-grow-1 p-3">
      <section className="intro nes-container with-title text-center flex-grow-1">
        <h2 className="title mb-4">Pixel Workshop</h2>
        
        {/* Center the content both horizontally and vertically */}
        <div className='container d-flex flex-column justify-content-center align-items-center'>
          {/* Set the image as a 50% transparent background */}
          <div
            style={{
              background: 'url("/assets/background/bg.png")',
              backgroundSize: 'cover',
              opacity: 0.9, // 50% transparent
              width: '500px', // Adjust the width as needed
              height: '500px', // Adjust the height as needed
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Link to="/game" className="nes-btn is-primary">
              Launch Game
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PlayNow;
