import styles from './ProductCard.module.css';
import { FaCartPlus } from 'react-icons/fa';
import { Link, useOutletContext } from 'react-router-dom';

const ProductCard = ({ title, image, price, id }) => {
  const { addToCart } = useOutletContext();
  return (
    <div className={styles.card}>
      <img src={image} alt="" />
      <h2>{title}</h2>
      <strong className={styles.price}>${price}</strong>
      <div className={styles.buttons}>
        <button>
          <Link to={`/shop/products/${id}`}>View</Link>
        </button>
        <button onClick={() => addToCart({ id, title, image, price })}>
          <FaCartPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
