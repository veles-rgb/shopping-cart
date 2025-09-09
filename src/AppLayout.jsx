import { Outlet } from 'react-router-dom';
import styles from './AppLayout.module.css';
import NavBar from './components/nav/NavBar';
import Footer from './components/footer/Footer';
import { useState } from 'react';

export default function AppLayout() {
  const [cart, setCart] = useState([]);

  const addToCart = (product, qty = 1) => {
    let existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      updateQty(product.id, existingItem.qty + qty);
    } else {
      let newProduct = { ...product, qty: qty };
      setCart([...cart, newProduct]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQty = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map((item) => (item.id === productId ? { ...item, qty } : item))
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className={styles.layout}>
      <header>
        <NavBar
          cart={cart}
          removeFromCart={removeFromCart}
          updateQty={updateQty}
        />
      </header>

      <main className={styles.main}>
        <Outlet
          context={{
            cart,
            addToCart,
            removeFromCart,
            updateQty,
            clearCart,
          }}
        />
      </main>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
