// src/components/MenuCard.js
import React from 'react';
import formatCash from '../helpers/CurrencyFormat';
const Card = ({id ,name, image, quantity, price }) => {
    return (
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <a href={"/product/"+id}>
                <img src={image}
                    alt="Image can't be loaded" className="h-80 w-72 object-cover rounded-t-xl" />
                <div className="px-4 py-3 w-72">
                    {quantity > 0 ? (
                        <span className="text-green-500 mr-3 uppercase text-xs font-bold">Available</span>
                    ) : (
                        <span className="text-red-600 mr-3 uppercase text-xs font-bold">Unavailable</span>
                    )}

                    <p className="text-lg font-bold text-black truncate block capitalize">{name}</p>
                    <div className="flex items-center">
                        <p className="text-lg font-semibold text-black cursor-auto my-3">{formatCash(price)} VND</p>
                        
                        {/* <del>
                            <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                        </del> */}
                        
                    </div>
                </div>
            </a>
        </div>
    );
};

export default Card;
