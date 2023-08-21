import React from 'react';
import { Link } from 'react-router-dom';

function Body() {
  return (
    <main className="flex-grow-1 d-flex align-items-center justify-content-center" >
      <section className="intro nes-container with-title text-center">
        <h2 className="title mb-4" style={{ fontSize: '2rem' }}>Welcome to the PixelCraft!</h2>
        <p>Unleash your creativity and craft pixel art items.</p>
        <Link to="/playnow" className="cta-button nes-btn mt-3">Start Crafting</Link>
      </section>
    </main>
  );
}

export default Body;
