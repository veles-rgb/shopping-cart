import { NavLink } from 'react-router-dom';
import styles from '../nav/NavBar.module.css';
import { FaSearch } from 'react-icons/fa';
import { GrCart } from 'react-icons/gr';

const NavBar = ({ cart }) => {
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  return (
    <nav className={styles.nav}>
      <h1>VelesShop</h1>
      <div className={styles.search}>
        <input className={styles.input} type="search" placeholder="SEARCH" />
        <button
          className={styles.searchButton}
          type="button"
          aria-label="Search"
        >
          <FaSearch />
        </button>
      </div>
      <ul className={styles.ul}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/shop">Shop</NavLink>
        </li>
        <li>
          <NavLink to="/cart">
            <GrCart />
            {cartCount}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
