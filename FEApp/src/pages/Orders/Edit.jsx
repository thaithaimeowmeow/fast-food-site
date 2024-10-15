import Header from "../../components/Admin/Header";
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";

function OrdersEdit() {
    const navigate = useNavigate();
    let { id } = useParams();

    const [status, setStatus] = useState("Pending");
    
    const [note, setNote] = useState([])
    const [address, setAddress] = useState([])


    useEffect(() => {
        const fetchOrder = async () => {
            try {
            const token = Cookies.get('_auth');
                const response = await axios.get('https://localhost:7216/api/cart/' + id, {
                    headers: {
                        'Authorization': 'Bearer '+token,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setStatus(response.data.status)
                setNote(response.data.note)
                setAddress(response.data.address)
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchOrder();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Selected status:", status);
        
        try {
            const token = Cookies.get('_auth');  // Retrieve token
            const response = await axios.put(
                'https://localhost:7216/api/cart/edit/' + id, 
                { status }, // Sending the status as JSON
                {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json', // Correct content type for JSON
                    },
                }
            );
            console.log('Form data submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting form data:', error.response?.data || error.message);
        }
    };
    

    return (
        <>
            <Header />
            <div className="flex justify-center min-h-screen">
                <div className="my-4 w-full max-w-4xl p-6 border shadow-md rounded-md">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-center">ORDER NO # {id}</h1>
                    </div>
                    <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit} encType="multipart/form-data">
                        {/* Address */}
                        <div className="flex items-center">
                            <label htmlFor="Address" className="w-32 text-lg font-medium text-gray-700">
                                Address
                            </label>
                            <div className="flex-1 p-3 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
                                {address}
                            </div>
                        </div>

                        {/* Note */}
                        <div className="flex items-center">
                            <label htmlFor="Note" className="w-32 text-lg font-medium text-gray-700">
                                Note
                            </label>
                            <div className="flex-1 p-3 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
                                {note}
                            </div>
                        </div>

                        {/* Status */}
                        <div className="flex items-center">
                            <label htmlFor="status" className="w-32 text-lg font-medium text-gray-700">
                                Status
                            </label>
                            <div className="flex-1">
                                <select
                                    id="status"
                                    name="status"
                                    value={status} // Bind the select to state
                                    onChange={(e) => setStatus(e.target.value)} // Update state on change
                                    className="w-full p-3 text-lg rounded-md focus:outline-none border border-gray-400 focus:ring-2 focus:ring-blue-300"
                                >
                                    <option className="text-red-500 font-bold" value="Pending">Pending</option>
                                    <option className="text-orange-500 font-bold" value="Preparing">Preparing</option>
                                    <option className="text-yellow-500 font-bold" value="Shipping">Shipping</option>
                                    <option className="text-green-500 font-bold" value="Finished">Finished</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button className="border border-black py-2 bg-blue-500 text-white font-bold rounded-md" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default OrdersEdit;
