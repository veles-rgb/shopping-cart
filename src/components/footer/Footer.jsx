import { FaGithub } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <>
      <small className={styles.small}>
        <a
          href="https://github.com/veles-rgb/shopping-cart"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaGithub size={24} color="white" />
          {'veles-rgb'}
        </a>
      </small>
    </>
  );
};
export default Footer;
