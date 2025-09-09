import styles from './ProductCard.module.css';
import { FaCartPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductCard = ({ title, image, price, id }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt="" />
      <h2>{title}</h2>
      <strong>${price}</strong>
      <div>
        <button>
          <Link to={`/shop/products/${id}`}>View</Link>
        </button>
        <button>
          <FaCartPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
