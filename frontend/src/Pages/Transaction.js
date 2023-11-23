import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AppState } from "../App.js";
import Tooltip from "@mui/material/Tooltip";

function Transaction() {
    const [payments, setpayments] = useState([]);
    const [query, setQuery] = useState("");
    const useAppState = useContext(AppState);
    const userID = useAppState.UserId;

    async function fetchTransaction() {
        try {
                const requestData = {
                    shopkeeperid: userID,
                };

            fetch('http://localhost:4000/payment/fetch_customer_data',{
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }
                    return response.json()
                })
                .then(data => {
                    setpayments(data)
                    console.log('Fetched Data:', data);

                })
                .catch(error => {
                    console.error('Error fetching Customers: ', error);

                })


        }
        catch (error) {
            window.alert(error);
        }
    }
    console.log(payments);
    useEffect(() => {
        fetchTransaction();
    }, [])


    return (
        <div className='flex flex-col justify-center items-center mt-8'>
            <h1 className='font-bold bg-gray-700 w-full h-full text-white text-center mx-auto p-3 rounded-full uppercase shadow-lg'>Transcation Details</h1>
            <Tooltip title='Search your Transactions'>
            <div className="mt-4  flex justify-center items-center ">
                <input
                    type="text"
                    placeholder="Search Transaction"
                    className="border-4 rounded-md border-[#1F3F49] px-2 py-1 mr-2 w-96 search_icon
                "
                    onChange={e => setQuery(e.target.value)}
                />
                {/* <button className="border rounded-md bg-green-500 text-white px-2 py-1">
                Search
            </button> */}
            </div>
            </Tooltip>
            <div className=' ml-8 mt-8 flex justify-center items-center'>
                {/* <div className='h-96 overflow-y-auto'> */} 
                <table className="w-1/2 border-collapse table-auto">
                    <thead className="text-center">
                        <tr>
                            <th className=" rounded-tl-xl border-gray-700 bg-gray-700 text-white  py-2 text-center text-xs font-medium uppercase">
                                <div className='pl-5 pr-5'>Sr No.</div>
                            </th>
                            <th className="border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className='pl-6 pr-6'>Customer Name</div>
                            </th>
                            <th className=" border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className='pl-6 pr-6'>Phone</div>
                            </th>
                            <th className=" border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className='pl-6 pr-6'>Total Cost</div>
                            </th>
                            <th className=" border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className='pl-6 pr-6'> Paid Amount</div>
                            </th>
                            <th className=" border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className='pl-6 pr-6'>Remaining Amount</div>
                            </th>
                            <th className="rounded-tr-xl border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                              <div className='pl-6 pr-6'> Payment Method</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {payments.filter((payments) => payments.customername.toLowerCase().includes(query.toLowerCase()) || payments.customerphoneno.includes(query)).map((payment, index) => (
                            <tr className='text-center capitalize hover:border-2 hover:border-black hover:rounded-md' style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#f8f8f8' }} key={payment._id} >
                                <td className='border border-gray-300 px-4 py-2 m-2 rounded bg-[1F3F49]'><p className='bg-gray-700 text-white w-8 h-8 rounded-full mt-1'>{index + 1}</p></td>
                                <td className='border border-gray-300 px-4 py-2'>{payment.customername}</td>
                                <td className='border border-gray-300 px-4 py-2'>{payment.customerphoneno}</td>
                                <td className='border border-gray-300 px-4 py-2'>{payment.totalCost}</td>
                                <td className='border border-gray-300 px-4 py-2'>{payment.amountpaid}</td>
                                <td className='border border-gray-300 px-4 py-2'>{payment.remaining_amount}</td>
                                <td className='border border-gray-300 px-4 py-2'>{payment.payment_method}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Transaction;