import ProductsList from '../../components/ProductsList/ProductsList';
import styles from './Shop.module.css';

const Shop = () => {
  return (
    <div className={styles.shop}>
      <ProductsList />
    </div>
  );
};

export default Shop;
