import styles from './ProductCard.module.css';
import { FaCartPlus } from 'react-icons/fa';

const ProductCard = ({ title, image, price }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt="" />
      <h2>{title}</h2>
      <p>{price}</p>
      <div>
        <button>View</button>
        <button>
          <FaCartPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
