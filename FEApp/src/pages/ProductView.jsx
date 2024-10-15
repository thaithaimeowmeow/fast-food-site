import React from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import formatCash from '../helpers/CurrencyFormat';


function ProductView() {
    const navigate = useNavigate();

    const isAuthenticated = useIsAuthenticated()

    const [product, setProducts] = useState([]);

    let { id } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://localhost:7216/api/product/' + id);
                setProducts(response.data);


            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = async () => {
        const data = {
            quantity: orderQuantity,
            productID: product.id,
        };
    
        try {
            const token = Cookies.get('_auth');
            const response = await axios.post('https://localhost:7216/api/item', data, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json', // Correct content type for JSON
                },
            });
            console.log('Form data submitted successfully:', response.data);
            navigate('/cart');
            
        } catch (error) {
            console.error('Error submitting form data:', error.response ? error.response.data : error.message);
        }
    };
    


    let min = 1;
    let max = product.quantity;

    const [orderQuantity, setOrderQuantity] = useState(min);

    const handleIncrement = () => {
        setOrderQuantity(prevQuantity => Math.min(prevQuantity + 1, max));
    };

    const handleDecrement = () => {
        setOrderQuantity(prevQuantity => Math.max(prevQuantity - 1, min));
    };


    return (
        <>
            {/*  dark:bg-gray-800 */}
            <div className="bg-gray-100 py-8 h-screen">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row -mx-4">
                        <div className="md:flex-1 px-4">
                            <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
                                <img className="w-full h-full object-cover" src={product.image} alt="This image can't be loaded" />
                            </div>

                            {isAuthenticated ? (
                                <div className="flex -mx-2 mb-4">
                                    <div className="w-3/4 px-2">
                                        <button onClick={handleAddToCart} className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
                                    </div>
                                    <div className="w-1/3 px-2">
                                        <div className="flex items-center">
                                            <button
                                                className="bg-gray-200 rounded-l-lg px-2 py-1 hover:bg-gray-300"
                                                onClick={handleDecrement}
                                            >
                                                -
                                            </button>
                                            <span className="mx-2 text-gray-600">{orderQuantity}</span>
                                            <button
                                                className="bg-gray-200 rounded-r-lg px-2 py-1 hover:bg-gray-300"
                                                onClick={handleIncrement}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}

                        </div>
                        <div className="md:flex-1 px-4">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>

                            <div className="flex mb-4">
                                <div className="mr-4">
                                    <span className="font-bold text-gray-700">Price: </span>
                                    <span className="text-gray-600">{formatCash(product.price)} VND</span>
                                </div>
                                <div>
                                    <span className="font-bold text-gray-700">Availability: </span>
                                    {product.quantity > 0 ? (
                                        <span className="text-green-500 font-bold">In Stock</span>
                                    ) : (
                                        <span className="text-red-600 font-bold">Out of Stock</span>
                                    )}

                                </div>
                            </div>

                            <div className='mb-4'>
                                <span className="font-bold text-gray-700 ">Product Description:</span>
                                <p className="text-gray-600text-sm mt-2">
                                    {product.description}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>

    );
};

export default ProductView;
