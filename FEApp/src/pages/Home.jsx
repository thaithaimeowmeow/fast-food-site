// src/pages/Home.js
import React from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://localhost:7216/api/product');
                // console.log(response.data);  // Check the response structure
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };

        fetchProducts();
    }, []);



    return (
        <div className="h-screen">
            <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">

                {products.map((product, index) => (
                    <Card key={product.id}
                        id={product.id}
                        name={product.name}
                        image={product.image}
                        quantity={product.quantity}
                        price={product.price} />
                ))}

            </div>

        </div>



    );
};

export default Home;
