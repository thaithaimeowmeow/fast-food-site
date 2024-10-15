import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import formatCash from '../helpers/CurrencyFormat';

const CartItem = ({ id, name, image, quantity, priceTotal }) => {

    const handleRemoveItem = (id) => {
        try {
            const token = Cookies.get('_auth');
            axios.delete(`https://localhost:7216/api/item/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    console.log(`Item with ID ${id} deleted`);
                    window.location.reload(false);
                })

        } catch (error) {
            console.error("Error fetching products", error);
        }


    }



    return (
        <div key={id} className="flex flex-col md:flex-row border-b border-gray-400 py-4">
            <div className="flex-shrink-0">
                {/* Assuming you have a valid image URL for each item */}
                <img src={image} alt="item" className="w-32 h-32 object-cover" />
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
                <h2 className="text-lg font-bold">{name}</h2>
                <p className="mt-2 text-gray-600">No description available.</p>
                <div className="mt-4 flex items-center">
                    <span className="mr-2 text-gray-600">Quantity:</span>
                    <div className="flex items-center">
                        <span className="mx-2 text-gray-600">{quantity}</span>
                    </div>
                    <span className="font-bold">Total: {formatCash(priceTotal)} VND</span>
                </div>
            </div>
            {/* Remove button aligned to the right */}
            <div className="mt-4 md:mt-0 md:ml-6 flex items-center ml-auto">
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                    onClick={() => handleRemoveItem(id)} // Add a remove function handler
                >
                    Remove
                </button>
            </div>
        </div>

    );
};

export default CartItem;
