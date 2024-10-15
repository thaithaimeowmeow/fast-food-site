import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Header from '../../components/Admin/Header';
import Cookies from 'js-cookie';
import formatCash from '../../helpers/CurrencyFormat';

function Orders() {

    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const fetchOrders = async () => {
        try {
            const token = Cookies.get('_auth');
            const response = await axios.get('https://localhost:7216/api/cart/admin/orders',
                {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'multipart+/form-data',
                    },
                }
            );
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    const fetchProducts = async () => {
        const response = await fetch('https://localhost:7216/api/product');
        const data = await response.json();
        setProducts(data);
    };


    // Fetch data when component mounts
    useEffect(() => {

        fetchProducts();
        fetchOrders();
    }, []);

    return (
        <>
            <Header />
            <div className="flex justify-center min-h-screen">
                <div className="my-4 space-x-10 w-full max-w-7xl">
                    <div className="row">
                            <h1 className="px-4 py-1 mb-4 font-bold rounded">ORDERS</h1>
                        <table className="min-w-full border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-2 border-b">ID</th>
                                    <th className="px-6 py-2 border-b">List</th>
                                    <th className="px-6 py-2 border-b">Address</th>
                                    <th className="px-6 py-2 border-b">Note</th>
                                    <th className="px-6 py-2 border-b">Price</th>
                                    <th className="px-6 py-2 border-b">Status</th>
                                    <th className="px-6 py-2 border-b">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={index} className="text-center">
                                        <td className="px-6 py-2 border-b">{order.id}</td>
                                        <td className="px-6 py-2 border-b">
                                        {order.cart_Items.map((item, i) => (
                                            <p key={i}>
                                                {products.find(product => product.id === item.productID)?.name} X {item.quantity}
                                            </p>
                                        ))}</td>
                                        <td className="px-6 py-2 border-b">{formatCash(order.total)} VND</td>
                                        <td className="px-6 py-2 border-b">{order.note}</td>
                                        <td className="px-6 py-2 border-b">{order.address}</td>
                                        <td className="px-6 py-2 border-b">{order.status}</td>

                                        <td className="px-6 py-2 border-b">
                                            <Link className="" to={"/orders/edit/" + order.id}>
                                                <button className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Orders;
