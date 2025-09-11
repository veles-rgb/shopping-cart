import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Outlet } from 'react-router-dom';
import ProductPage from '../pages/product-page/ProductPage';
import { describe, expect, it } from 'vitest';

function TestLayout() {
  return <Outlet context={{ addToCart: () => {} }} />;
}

describe('ProductPage', () => {
  it('shows loading state when navigating to a product route', () => {
    render(
      <MemoryRouter initialEntries={['/shop/products/7']}>
        <Routes>
          <Route element={<TestLayout />}>
            <Route path="/shop/products/:productId" element={<ProductPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
