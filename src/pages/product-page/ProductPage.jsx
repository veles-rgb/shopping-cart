import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (!product) return <div>Product Not Found</div>;
  if (loading) return <div>Loading…</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <img src={product.image} alt="" />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <strong>${product.price}</strong>
      <div>
        <button>Add to Cart</button>
        <button>Buy Now</button>
      </div>
    </div>
  );
}
