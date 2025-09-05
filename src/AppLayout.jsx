import { Outlet } from 'react-router-dom';
import styles from './AppLayout.module.css';
import NavBar from './components/nav/NavBar';
import Footer from './components/footer/Footer';

export default function AppLayout() {
  return (
    <div className={styles.layout}>
      <header>
        <NavBar />
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
