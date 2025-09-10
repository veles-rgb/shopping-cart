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
        if (response.status >= 400) {
          throw new Error('Server error');
        }
        return response.json();
      })
      .then((data) => setProduct(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <div className={styles.loading}>Loading…</div>;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;
  if (!product)
    return <div className={styles.noProduct}>Product Not Found</div>;

  return (
    <div>
      <img src={product.image} alt="" />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <strong>${product.price}</strong>

      <div>
        <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
        />
        <button onClick={() => setQty(qty + 1)}>+</button>
      </div>

      <div>
        <button onClick={() => addToCart(product, qty)}>Add to Cart</button>
        <button>Buy Now</button>
      </div>
    </div>
  );
}
