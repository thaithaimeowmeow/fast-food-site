import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import CartItem from '../components/CartItem';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import formatCash from '../helpers/CurrencyFormat';

const Cart = () => {
    const navigate = useNavigate();

    const [cart, setCart] = useState({
        cart_Items: []
    });

    const [products, setProducts] = useState([]);

    const [subTotal, setSubTotal] = useState(0);

    const [address, setAddress] = useState('');  // Add state for address
    const [note, setNote] = useState('');        // Add state for note

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const token = Cookies.get('_auth');
                const response = await axios.get('https://localhost:7216/api/cart/items', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data);
                setCart(response.data);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };

        const fetchProducts = async () => {
            const response = await fetch('https://localhost:7216/api/product');
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
        fetchItems();
    }, []);

    useEffect(() => {
        const total = cart.cart_Items.reduce((accumulator, item) => {
            return accumulator + item.priceTotal;
        }, 0);
        setSubTotal(total);
    }, [cart.cart_Items]);

    const handleCheckout = async () => {
        if (window.confirm(`Confirm checking out?`)) {
            try {
                const token = Cookies.get('_auth');
                const response = await axios.put('https://localhost:7216/api/cart/checkout', {
                    address,
                    note,    
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    },
                });
                toast.success("Checkout confirmed!");
                navigate('/');
                console.log(response.data);
            } catch (error) {
                console.error("Error checking out", error);
                toast.warning("Error checking out");
            }
        } else {
            console.log("Checking out cancelled");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <h1 className="text-2xl font-bold my-4">Shopping Cart</h1>
                <button onClick={handleCheckout} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                    Checkout
                </button>
            </div>

            <div className="mt-8">
                {cart.cart_Items.map(item => (
                    <CartItem
                        key={item.id}
                        id={item.id}
                        name={products.find(product => product.id === item.productID)?.name}
                        image={products.find(product => product.id === item.productID)?.image}
                        quantity={item.quantity}
                        priceTotal={item.priceTotal}
                    />
                ))}
            </div>
            <div className="flex justify-end items-center mt-8">
                <span className="text-gray-600 mr-4">Subtotal:</span>
                <span className="text-xl font-bold">{formatCash(subTotal)} VND</span>
            </div>

            {/* Textarea for Address */}
            <div className="mt-4">
                <label htmlFor="address" className="block text-lg font-medium text-gray-700">
                    Address
                </label>
                <textarea
                    id="address"
                    name="address"
                    rows="3"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} // Update state
                />
            </div>

            {/* Textarea for Note */}
            <div className="mt-4">
                <label htmlFor="note" className="block text-lg font-medium text-gray-700">
                    Note
                </label>
                <textarea
                    id="note"
                    name="note"
                    rows="3"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={note}
                    onChange={(e) => setNote(e.target.value)} // Update state
                />
            </div>
        </div>
    );
};

export default Cart;
