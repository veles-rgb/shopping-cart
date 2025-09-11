import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Outlet } from 'react-router-dom';
import ProductsList from '../components/ProductsList/ProductsList';
import { describe, expect, it, vi } from 'vitest';

function TestLayout() {
  return <Outlet context={{ addToCart: () => {} }} />;
}

describe('ProductsList', () => {
  it('renders heading and product cards after a successful fetch', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      status: 200,
      json: () =>
        Promise.resolve([
          {
            id: 1,
            title: 'Alpha Jacket',
            image: '/a.png',
            price: 49.99,
            description: '',
          },
          {
            id: 2,
            title: 'Beta Shoes',
            image: '/b.png',
            price: 89.0,
            description: '',
          },
        ]),
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<TestLayout />}>
            <Route path="/" element={<ProductsList />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/our products/i)).toBeInTheDocument();
    });
    expect(screen.getByText('Alpha Jacket')).toBeInTheDocument();
    expect(screen.getByText('Beta Shoes')).toBeInTheDocument();
  });

  it('shows error state when the request fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      status: 500,
      json: () => Promise.resolve({}),
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<TestLayout />}>
            <Route path="/" element={<ProductsList />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/error:/i)).toBeInTheDocument();
    });
  });
});
