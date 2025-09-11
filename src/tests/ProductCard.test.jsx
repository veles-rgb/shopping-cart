import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route, Outlet } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';
import { describe, expect, it, vi } from 'vitest';

function TestLayout({ addToCart }) {
  return <Outlet context={{ addToCart }} />;
}

function ProductCardRoute() {
  return (
    <ProductCard
      id={5}
      title="Comfy Hat"
      image="/hat.png"
      price={12.99}
      description="Warm and soft"
    />
  );
}

describe('ProductCard', () => {
  it('renders title, price, and image', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<TestLayout addToCart={() => {}} />}>
            <Route path="/" element={<ProductCardRoute />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Comfy Hat')).toBeInTheDocument();
    expect(screen.getByText('$12.99')).toBeInTheDocument();
    const img = screen.getByRole('img', { hidden: true });
    expect(img).toHaveAttribute('src', '/hat.png');
  });

  it('links View to /shop/products/:id', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<TestLayout addToCart={() => {}} />}>
            <Route path="/" element={<ProductCardRoute />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const viewLink = screen.getByRole('link', { name: /view/i });
    expect(viewLink).toHaveAttribute('href', '/shop/products/5');
  });

  it('calls addToCart when clicking the Add button', async () => {
    const mockAddToCart = vi.fn();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<TestLayout addToCart={mockAddToCart} />}>
            <Route path="/" element={<ProductCardRoute />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const addBtn = screen.getByRole('button', { name: /add .* to cart/i });
    await userEvent.click(addBtn);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith({
      id: 5,
      title: 'Comfy Hat',
      image: '/hat.png',
      price: 12.99,
    });
  });
});
