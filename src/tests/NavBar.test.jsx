import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import NavBar from '../components/nav/NavBar';

describe('NavBar', () => {
  it('renders Home, Shop, and Cart links', () => {
    render(
      <MemoryRouter>
        <NavBar cart={[]} />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /^home$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^shop$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^cart$/i })).toBeInTheDocument();
  });

  it('shows the total cart quantity in the Cart icon', () => {
    const cart = [
      { id: 1, title: 'A', qty: 2, price: 10, image: '' },
      { id: 2, title: 'B', qty: 3, price: 5, image: '' },
    ]; // total = 5

    render(
      <MemoryRouter>
        <NavBar cart={cart} />
      </MemoryRouter>
    );

    const cartLink = screen.getByRole('link', { name: /cart/i });
    expect(within(cartLink).getByText('5')).toBeInTheDocument();
  });

  it('renders the brand link to home', () => {
    render(
      <MemoryRouter>
        <NavBar cart={[]} />
      </MemoryRouter>
    );

    const brand = screen.getByRole('link', { name: /velesshop/i });
    expect(brand).toBeInTheDocument();
    expect(brand).toHaveAttribute('href', '/');
  });

  it('navigates to /shop when clicking the Shop link', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <>
          <NavBar cart={[]} />
          <Routes>
            <Route path="/" element={<h2>Home Page</h2>} />
            <Route path="/shop" element={<h2>Shop Page</h2>} />
          </Routes>
        </>
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole('link', { name: /^shop$/i }));
    expect(screen.getByText(/shop page/i)).toBeInTheDocument();
  });

  it('navigates to / when clicking the Home link', async () => {
    render(
      <MemoryRouter initialEntries={['/shop']}>
        <>
          <NavBar cart={[]} />
          <Routes>
            <Route path="/" element={<h2>Home Page</h2>} />
            <Route path="/shop" element={<h2>Shop Page</h2>} />
          </Routes>
        </>
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole('link', { name: /^home$/i }));
    expect(screen.getByText(/home page/i)).toBeInTheDocument();
  });
});
