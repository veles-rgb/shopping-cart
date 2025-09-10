import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate('/shop');
  };

  return (
    <div className={styles.page}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1>Welcome to VelesShop</h1>
        <p>
          Where browsing is simple, and checkout is a breeze. Start exploring
          our collection and find something you’ll love today.
        </p>
        <button onClick={handleShopNowClick}>SHOP NOW</button>
      </div>
    </div>
  );
}
