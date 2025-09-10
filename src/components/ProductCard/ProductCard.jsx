import styles from './ProductCard.module.css';
import { FaCartPlus } from 'react-icons/fa';
import { Link, useOutletContext } from 'react-router-dom';

const ProductCard = ({ id, title, image, price }) => {
  const { addToCart } = useOutletContext();

  return (
    <div className={styles.card}>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <strong className={styles.price}>${price}</strong>

      <div className={styles.actions}>
        <Link className={styles.view} to={`/shop/products/${id}`}>
          View
        </Link>
        <button
          type="button"
          className={styles.add}
          onClick={() => addToCart({ id, title, image, price })}
          aria-label={`Add ${title} to cart`}
        >
          <FaCartPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
