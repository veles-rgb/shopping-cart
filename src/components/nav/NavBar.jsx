import { NavLink } from 'react-router-dom';
import { Link } from 'react-router';
import styles from '../nav/NavBar.module.css';
import { FaSearch } from 'react-icons/fa';
import { GrCart } from 'react-icons/gr';

const NavBar = ({ cart }) => {
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.brandLink}>
        <h1 className={styles.brand}>VelesShop</h1>
      </Link>

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
          <NavLink to="/" className={styles.link}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop" className={styles.link}>
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={`${styles.link} ${styles.cartLink}`}>
            <GrCart />
            <span className={styles.badge}>{cartCount}</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
