import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../../components/Admin/Header';
import Cookies from 'js-cookie';


function Create() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        Name: '',
        Quantity: 0,
        Price: 10000,
        Description: '',
        ImageFile: ''
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a new FormData object
        const data = new FormData();
        data.append('Name', formData.Name);
        data.append('Quantity', formData.Quantity);
        data.append('Price', formData.Price);
        data.append('Description', formData.Description);
        data.append('ImageFile', document.getElementById('image').files[0]);

        try {
            const token = Cookies.get('_auth');
            const response = await axios.post('https://localhost:7216/api/product', data, {
                headers: {
                    'Authorization': 'Bearer '+token,
                    'Content-Type': 'multipart+/form-data',
                },
            });
            console.log('Form data submitted successfully:', response.data);
            navigate('/products');
        } catch (error) {
            console.error('Error submitting form data:', error.response.data);
        }
    };

    return (
        <>
        <Header/>
        <div className="flex justify-center min-h-screen">
            <div className="my-4 w-full max-w-4xl p-6 border shadow-md rounded-md">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-center">Create Product</h1>
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6" encType="multipart/form-data">
                    {/* Product Name */}
                    <div className="flex items-center">
                        <label htmlFor="name" className="w-32 text-lg font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            id="Name"
                            name="Name"
                            className="flex-1 p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                            type="text"
                            value={formData.Name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Product Quantity */}
                    <div className="flex items-center">
                        <label htmlFor="quantity" className="w-32 text-lg font-medium text-gray-700">
                            Quantity
                        </label>
                        <input
                            id="Quantity"
                            name="Quantity"
                            className="flex-1 p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                            type="number"
                            min={0}
                            value={formData.Quantity}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Product Price */}
                    <div className="flex items-center">
                        <label htmlFor="price" className="w-32 text-lg font-medium text-gray-700">
                            Price
                        </label>
                        <input
                            id="Price"
                            name="Price"
                            className="flex-1 p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                            type="number"
                            min={0}
                            value={formData.Price}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Product Description */}
                    <div className="flex items-center">
                        <label htmlFor="description" className="w-32 text-lg font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="Description"
                            name="Description"
                            className="flex-1 p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                            rows="3"
                            value={formData.Description}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    {/* Product Image */}
                    <div className="flex items-center">
                        <label htmlFor="image" className="w-32 text-lg font-medium text-gray-700">
                            Image
                        </label>
                        <input
                            id="image"
                            name="ImageFile"
                            type="file"
                            accept="image/*"
                            className="flex-1 p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                            onChange={handleChange}
                        />
                    </div>
                    <button className="border border-black py-2 bg-blue-500 text-white font-bold rounded-md" type="submit">Submit</button>
                </form>
            </div>
        </div>
        </>
    );
}

export default Create;
