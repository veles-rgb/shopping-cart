import styles from './ProductsList.module.css';
import { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Server error');
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={styles.centerState}>Loading…</div>;
  if (error)
    return <div className={styles.centerState}>Error: {error.message}</div>;

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Our Products</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            id={product.id}
            key={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsList;
