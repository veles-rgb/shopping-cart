import { Outlet } from 'react-router-dom';
import NavBar from './components/nav/NavBar';

export default function AppLayout() {
  return (
    <div>
      <header>
        <NavBar />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <small>© Shopping Cart Project</small>
      </footer>
    </div>
  );
}
