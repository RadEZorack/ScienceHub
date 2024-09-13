// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <nav>
      <ul>
        <li><Link to="/">Science Hub</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
