import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Home from '../pages/home/Home';
import Shop from '../pages/shop/Shop';

describe('Home', () => {
  it('renders the welcome heading, description and button', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/welcome to velesshop/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Where browsing is simple, and checkout is a breeze. Start exploring our collection and find something you’ll love today./
      ).toBeInTheDocument
    );

    expect(
      screen.getByRole('button', { name: /shop now/i })
    ).toBeInTheDocument();
  });

  it('navigates to /shop when clicking the button', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole('button', { name: /shop now/i }));

    // ProductsList renders a loading indicator immediately
    expect(await screen.findByText(/loading/i)).toBeInTheDocument();
  });
});
