import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useOutletContext } from 'react-router-dom';
import styles from './ProductPage.module.css';

export default function ProductPage() {
  const { addToCart } = useOutletContext();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => {
        if (response.status >= 400) throw new Error('Server error');
        return response.json();
      })
      .then((data) => setProduct(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <div className={styles.centerState}>Loading…</div>;
  if (error)
    return <div className={styles.centerState}>Error: {error.message}</div>;
  if (!product)
    return <div className={styles.centerState}>Product Not Found</div>;

  return (
    <div className={styles.product}>
      <div className={styles.gallery}>
        <img src={product.image} alt={product.title} />
      </div>

      <div className={styles.info}>
        <div className={styles.topline}>
          <span className={styles.category}>{product.category}</span>
          {product.rating && (
            <span className={styles.rating}>
              ★ {product.rating.rate} ({product.rating.count})
            </span>
          )}
        </div>

        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.price}>${product.price}</div>

        <div className={styles.controls}>
          <div className={styles.qty}>
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            />
            <button
              onClick={() => setQty(qty + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.add}
              onClick={() => addToCart(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" disabled className={styles.buy}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
