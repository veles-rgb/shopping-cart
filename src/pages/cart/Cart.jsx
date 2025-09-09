import styles from './Cart.module.css';
import { useOutletContext } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQty, clearCart } = useOutletContext();
  if (cart.length === 0)
    return <div className={styles.empty}>Cart is empty.</div>;
  return (
    <div>
      <button onClick={() => clearCart()}>Clear Cart</button>
      {cart.map((item) => (
        <div key={item.id}>
          <img src={item.image} alt="" />
          <h3>{item.title}</h3>
          <div>
            <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={(e) => updateQty(item.id, Number(e.target.value))}
            />
            <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
          </div>

          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
