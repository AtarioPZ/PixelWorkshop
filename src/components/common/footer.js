import React from 'react';

function Footer() {
  return (
    <footer className="footer py-2 bg-dark">
      <p className="text-white text-center">&copy; {new Date().getFullYear()} Victor Basumatary. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
