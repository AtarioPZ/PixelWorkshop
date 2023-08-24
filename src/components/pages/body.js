import React from 'react';
import { Link } from 'react-router-dom';

function Body() {
  return (
    <main className="flex-grow-1 d-flex align-items-center justify-content-center m-3">
      <section className="intro nes-container with-title text-center">
        <h2 className="title mb-4" style={{ fontSize: '2rem' }}>Welcome to the PixelCraft!</h2>
        <p>Discover the joys of combining 2 elements to create new items.</p>
        <Link to="/playnow" className="cta-button nes-btn mt-3">Start Crafting</Link>
      </section>
    </main>
  );
}

export default Body;
