import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Header from "../../components/Admin/Header";
import Cookies from 'js-cookie';

function Edit() {
    const navigate = useNavigate();
    let { id } = useParams();

    const [formData, setFormData] = useState({
        Name: '',
        Quantity: 0,
        Price: 0,
        Description: '',
        ImageFile: null, // Initialize ImageFile as null
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
            const token = Cookies.get('_auth');
                const response = await axios.get('https://localhost:7216/api/product/' + id);
                setFormData({
                    Name: response.data.name,
                    Quantity: response.data.quantity,
                    Price: response.data.price,
                    Description: response.data.description,
                    ImageFile: null 
                });
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [id]);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "ImageFile") {
            setFormData({ ...formData, ImageFile: files[0] }); 
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('Name', formData.Name);
        data.append('Quantity', formData.Quantity);
        data.append('Price', formData.Price);
        data.append('Description', formData.Description);
        if (formData.ImageFile) {
            data.append('ImageFile', formData.ImageFile); 
        }

        try {
            const token = Cookies.get('_auth');
            const response = await axios.put('https://localhost:7216/api/product/' + id, data, {
                headers: {
                    'Authorization': 'Bearer '+token,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Form data submitted successfully:', data);
            navigate('/products');
        } catch (error) {
            console.error('Error submitting form data:', error.response.data);
        }
    };

    return (
        <>
            <Header />
            <div className="flex justify-center min-h-screen">
                <div className="my-4 w-full max-w-4xl p-6 border shadow-md rounded-md">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-center">Edit Product</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6" encType="multipart/form-data">
                        {/* Product Name */}
                        <div className="flex items-center">
                            <label htmlFor="Name" className="w-32 text-lg font-medium text-gray-700">
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
                            <label htmlFor="Quantity" className="w-32 text-lg font-medium text-gray-700">
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
                            <label htmlFor="Price" className="w-32 text-lg font-medium text-gray-700">
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
                            <label htmlFor="Description" className="w-32 text-lg font-medium text-gray-700">
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
                            <label htmlFor="ImageFile" className="w-32 text-lg font-medium text-gray-700">
                                Image
                            </label>
                            <input
                                id="ImageFile"
                                name="ImageFile"
                                type="file"
                                accept="image/*"
                                className="flex-1 p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                onChange={handleChange}
                            />
                        </div>
                        <button className="border border-black py-2 bg-blue-500 text-white font-bold rounded-md" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Edit;
