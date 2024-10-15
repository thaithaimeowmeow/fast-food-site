import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Header from '../../components/Admin/Header';
import Cookies from 'js-cookie';
import formatCash from '../../helpers/CurrencyFormat';

function Products() {

    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://localhost:7216/api/product');
            // console.log(response.data);  // Check the response structure
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    // Fetch data when component mounts
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete item with ID ${id}?`)) {
            try {
                const token = Cookies.get('_auth');
                axios.delete(`https://localhost:7216/api/product/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                        console.log(`Item with ID ${id} deleted`);
                        fetchProducts();

                    })

            } catch (error) {
                console.error("Error fetching products", error);
            }


        } else {
            // Cancel action
            console.log("Delete cancelled");
        }
    };

    return (
        <>
            <Header />
            <div className="flex justify-center min-h-screen">
                <div className="my-4 space-x-10 w-full max-w-7xl">
                    <div className="row">
                        <Link className="" to="/products/create">
                            <button className="px-4 py-1 mb-4 bg-green-500 text-white rounded hover:bg-green-600">Create</button>
                        </Link>
                        <table className="min-w-full border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-2 border-b">ID</th>
                                    <th className="px-6 py-2 border-b">Name</th>
                                    <th className="px-6 py-2 border-b">Quantity</th>
                                    <th className="px-6 py-2 border-b">Price</th>
                                    <th className="px-6 py-2 border-b">Image</th>
                                    <th className="px-6 py-2 border-b">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index} className="text-center">
                                        <td className="px-6 py-2 border-b">{product.id}</td>
                                        <td className="px-6 py-2 border-b">{product.name}</td>
                                        <td className="px-6 py-2 border-b">{product.quantity}</td>
                                        <td className="px-6 py-2 border-b">{formatCash(product.price)} VND</td>
                                        <td className="px-6 py-2 border-b">
                                            <div className="flex justify-center items-center">
                                                <img src={product.image || "https://placehold.co/600x400"} alt={product.name} className="h-20 w-20 object-cover" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-2 border-b">
                                            <Link className="" to={"/products/edit/" + product.id}>
                                                <button className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                                            </Link>
                                            <button onClick={() => handleDelete(product.id)} className="ml-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
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

export default Products;
