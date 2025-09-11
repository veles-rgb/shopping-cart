import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Outlet } from 'react-router-dom';
import Cart from '../pages/cart/Cart';
import { describe, expect, it } from 'vitest';

function TestLayout({ context }) {
    return <Outlet context={context} />;
}

describe('Cart (render-only, no state logic)', () => {
    it('shows empty state when cart is empty', () => {
        render(
            <MemoryRouter initialEntries={['/cart']}>
                <Routes>
                    <Route
                        element={
                            <TestLayout
                                context={{
                                    cart: [],
                                    removeFromCart: () => { },
                                    updateQty: () => { },
                                    clearCart: () => { },
                                }}
                            />
                        }
                    >
                        <Route path="/cart" element={<Cart />} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
    });

    it('renders items, line totals, subtotal and disabled checkout', () => {
        const cart = [
            { id: 1, title: 'Alpha', price: 10, qty: 2, image: '/a.png' }, // $20.00
            { id: 2, title: 'Beta', price: 5, qty: 3, image: '/b.png' }, // $15.00
        ];

        render(
            <MemoryRouter initialEntries={['/cart']}>
                <Routes>
                    <Route
                        element={
                            <TestLayout
                                context={{
                                    cart,
                                    removeFromCart: () => { },
                                    updateQty: () => { },
                                    clearCart: () => { },
                                }}
                            />
                        }
                    >
                        <Route path="/cart" element={<Cart />} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        // Items render
        expect(screen.getByText('Alpha')).toBeInTheDocument();
        expect(screen.getByText('Beta')).toBeInTheDocument();

        // Line totals
        expect(screen.getByText('$20.00')).toBeInTheDocument();
        expect(screen.getByText('$15.00')).toBeInTheDocument();

        // Subtotal = $35.00
        expect(screen.getAllByText('$35.00').length).toBeGreaterThan(0);

        // Disabled checkout button present
        const checkoutBtn = screen.getByRole('button', { name: /proceed to checkout/i });
        expect(checkoutBtn).toBeDisabled();
    });
});