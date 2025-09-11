import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

vi.mock('../components/ProductsList/ProductsList', () => ({
  default: () => <div data-testid="products-list-stub">ProductsList Stub</div>,
}));

import Shop from '../pages/shop/Shop';

describe('Shop page', () => {
  it('Renders ProductsList in shop page', () => {
    render(
      <MemoryRouter>
        <Shop />
      </MemoryRouter>
    );

    expect(screen.getByTestId('products-list-stub')).toBeInTheDocument();
  });
});
