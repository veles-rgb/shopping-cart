import React from 'react';
import { NavLink } from 'react-router';
import '../nav/NavBar.module.css';

const NavBar = () => {
  return (
    <nav>
      <h1>VelesShop</h1>
      <input type="search" name="" id="" />
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/shop">Shop</NavLink>
        </li>
        <li>
          <NavLink to="/cart">Cart</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
