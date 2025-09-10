import { FaGithub } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/veles-rgb/shopping-cart"
        rel="noopener noreferrer"
        target="_blank"
        className={styles.link}
      >
        <FaGithub size={20} />
        <span>veles-rgb</span>
      </a>
      <small className={styles.copy}>
        © {new Date().getFullYear()} VelesShop. All rights reserved.
      </small>
    </footer>
  );
};

export default Footer;
