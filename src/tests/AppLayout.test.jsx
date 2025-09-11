// src/tests/AppLayout.test.jsx
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  MemoryRouter,
  Routes,
  Route,
  useOutletContext,
} from 'react-router-dom';
import AppLayout from '../AppLayout';
import { describe, expect, it } from 'vitest';

function TestChild() {
  const { addToCart } = useOutletContext();
  return (
    <button
      type="button"
      onClick={() =>
        addToCart({ id: 1, title: 'Alpha', price: 10, image: '' }, 1)
      }
    >
      Add Alpha
    </button>
  );
}

describe('AppLayout', () => {
  it('renders nav, main (outlet), and footer', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<div>Child Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText(/child content/i)).toBeInTheDocument();

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('provides outlet context and updates NavBar cart count after addToCart', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<TestChild />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: /add alpha/i }));

    const nav = screen.getByRole('navigation');
    const cartLink = within(nav).getByRole('link', { name: /cart/i });

    expect(within(cartLink).getByText('1')).toBeInTheDocument();
  });
});
