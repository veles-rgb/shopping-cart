import styles from './Cart.module.css';
import { useOutletContext } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQty, clearCart } = useOutletContext();

  if (cart.length === 0)
    return <div className={styles.empty}>Cart is empty.</div>;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className={styles.cart}>
      <div className={styles.header}>
        <h1>Your Cart</h1>
        <button className={styles.clear} onClick={() => clearCart()}>
          Clear Cart
        </button>
      </div>

      <div className={styles.layout}>
        <div className={styles.items}>
          {cart.map((item) => (
            <div key={item.id} className={styles.item}>
              <img src={item.image} alt={item.title} />
              <div className={styles.details}>
                <h3>{item.title}</h3>
                <p className={styles.price}>${item.price}</p>
                <div className={styles.qty}>
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => updateQty(item.id, Number(e.target.value))}
                  />
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={styles.lineTotal}>
                ${(item.price * item.qty).toFixed(2)}
              </div>

              <button
                className={styles.remove}
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <aside className={styles.summary}>
          <h2>Order Summary</h2>
          <div className={styles.row}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.row}>
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className={`${styles.row} ${styles.total}`}>
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <button className={styles.checkout} type="button" disabled>
            Proceed to checkout
          </button>
          <p className={styles.note}>Checkout not implemented.</p>
        </aside>
      </div>
    </div>
  );
}
