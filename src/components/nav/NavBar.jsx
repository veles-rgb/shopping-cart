import React from 'react';
import { NavLink } from 'react-router';

const NavBar = () => {
  return (
    <nav>
      <h1>VelesShop</h1>
      <input type="search" name="" id="" />
      <NavLink to="/">Home</NavLink>
      <NavLink to="/shop">Shop</NavLink>
      <NavLink to="/cart">Cart</NavLink>
    </nav>
  );
};

export default NavBar;
