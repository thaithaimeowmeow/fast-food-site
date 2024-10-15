import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Products from './pages/Products/Products.jsx';
import Create from './pages/Products/Create.jsx';
import ProductView from './pages/ProductView.jsx';
import Edit from './pages/Products/Edit.jsx';
import Login from './pages/Auth/Login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import Register from './pages/Auth/Register.jsx';
import Cart from './pages/Cart.jsx';
import Orders from './pages/Orders/Orders.jsx';
import OrdersEdit from './pages/Orders/Edit.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Routes>
        <Route path="/product/:id" element={<ProductView />} /> {/* Product details route */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
        <Route element={<AuthOutlet fallbackPath='/login' />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/create" element={<Create />} />
          <Route path="/products/edit/:id" element={<Edit />} /> {/* Product details route */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/edit/:id" element={<OrdersEdit />} /> {/* Product details route */}
        </Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
