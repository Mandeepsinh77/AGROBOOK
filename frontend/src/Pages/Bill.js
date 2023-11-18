import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../useContext/DataContext';


function Bill() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name');
    const phoneno = searchParams.get('phoneno');
    const date = searchParams.get('time');
    const [transactionData, setTransactionData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const {data,shopname} = useData();

    useEffect(() => {
        const url = `http://localhost:4000/payment/get_items_bill/${phoneno}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setTransactionData(data);   

                // Calculate the total amount
                const amount = data.reduce((total, transaction) => {
                    return total + transaction.items.reduce((itemTotal, item) => {
                        return itemTotal + parseInt(item.sellingPrice, 10) * parseInt(item.quantity, 10);
                    }, 0);
                }, 0);
                setTotalAmount(amount);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handlePrint = () => {
        // Apply styles to hide buttons before printing
        const billSection = document.getElementById('bill-section');
        if (billSection) {
            billSection.classList.add('printing');
            setTimeout(() => {
                window.print();
                // Remove the added class after printing
                billSection.classList.remove('printing');
            }, 0);
        }
    }
    const handleNavigate = () => {
        navigate('/dashboard')
    }

    return (
        <div className="flex justify-center items-center bg-gray-100 overflow-y-auto">
            <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-black-600">{shopname}</h2>
                <h2 className="text-2xl font-bold mb-4 text-green-600">Bill Details</h2>

                <p className="mb-4 text-gray-600">Customer Name : {name}</p>
                <p className="mb-4 text-gray-600">Customer Phone : {phoneno}</p>
                <p className="mb-4 text-gray-600">Date : {date.slice(0,10)} </p>

                <h3 className="text-xl font-bold mb-4 text-green-600">Purchased Items:</h3>

                <div className="mb-4">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-green-200">
                                <th className="w-1/4 text-center p-2 border">Item</th>
                                <th className="w-1/4 text-center p-2 border">Quantity</th>
                                <th className="w-1/4 text-center p-2 border">Price</th>
                                <th className="w-1/4 text-center p-2 border">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionData.map((transaction, index) => (
                                transaction.items.map((item, itemIndex) => (
                                    <tr key={itemIndex}>
                                        <td className="w-1/4 text-center p-2 border">{item.itemname}</td>
                                        <td className="w-1/4 text-center p-2 border">{item.quantity}</td>
                                        <td className="w-1/4 text-center p-2 border">{item.sellingPrice}</td>
                                        <td className="w-1/4 text-center p-2 border">{item.totalPriceOfItem}</td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="w-1/4 text-center p-2  ">Total Amount : </td>
                                <td></td>
                                <td></td>
                                <td className="w-1/4 text-center p-2  ">{totalAmount}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div id="bill-section" className="mx-auto max-w-md p-6 bg-white rounded-lg shadow-lg flex items-center justify-center space-x-4">
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
                        onClick={handlePrint}
                    >
                        Print Invoice
                    </button>

                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover-bg-blue-600 cursor-pointer"
                        onClick={handleNavigate}
                    >
                        Back to Home
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Bill;