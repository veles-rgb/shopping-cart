import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import AppLayout from './AppLayout.jsx';
import Home from './pages/home/Home.jsx';
import Shop from './pages/shop/Shop.jsx';
import Cart from './pages/cart/Cart.jsx';
import ProductPage from './pages/product-page/ProductPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'shop',
        children: [
          { index: true, element: <Shop /> },
          { path: 'products/:productId', element: <ProductPage /> },
        ],
      },
      { path: 'cart', element: <Cart /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
