import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AppState } from "../App.js";
import Tooltip from "@mui/material/Tooltip";
import nullImage from "../images/nullImg.png";

function Transaction() {
    const [payments, setpayments] = useState([]);
    const [query, setQuery] = useState("");
    const useAppState = useContext(AppState);
    const userID = useAppState.UserId;
    const [loader,setLoader] = useState(true);


    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 6;
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentTransactions = payments.slice(indexOfFirstCustomer, indexOfLastCustomer);

    const totalPages = Math.ceil(payments.length / customersPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

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
                    setTimeout(()=>{
                        setpayments(data);
                        setLoader(false);
                    },500)
                    console.log('Fetched Data:', data);

                })
                .catch(error => {
                    console.error('Error fetching Transactions: ', error);

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
            {currentTransactions.length == 0 ?
                (<div className="flex flex-col items-center justify-center mt-36">
                    <img src="https://assets-v2.lottiefiles.com/a/d5392796-1169-11ee-908e-b33ed8d96ca4/kW0SJwvz27.gif" className='text-green w-24 h-24 rounded-full' alt="Description of the image" />
                    <img src={nullImage} alt="Description of the image" />
                    <h3>No Data</h3>
                </div>
                ) : 
                (
            <div className=' ml-8 mt-8 flex flex-col justify-center items-center'>
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
                          {currentTransactions.filter((currentTransactions) => currentTransactions.customername.toLowerCase().includes(query.toLowerCase()) || currentTransactions.customerphoneno.includes(query)).map((payment, index) => (
                            <tr className='text-center capitalize hover:border-2 hover:border-black hover:rounded-md' style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#f8f8f8' }} key={payment._id} >
                                <td className='border border-gray-300 px-4 py-2 m-2 rounded bg-[1F3F49]'><p className='bg-gray-700 text-white w-8 h-8 rounded-full mt-1'>{index + 1 + (currentPage-1)*customersPerPage}</p></td>
                                <td className='border border-gray-300 px-4 py-2 font-[Poppins]'>{payment.customername}</td>
                                <td className='border border-gray-300 px-4 py-2 font-[Poppins]'>{payment.customerphoneno}</td>
                                <td className='border border-gray-300 px-4 py-2 font-[Poppins]'>{payment.totalCost}</td>
                                <td className='border border-gray-300 px-4 py-2 font-[Poppins]'>{payment.amountpaid}</td>
                                <td className='border border-gray-300 px-4 py-2 font-[Poppins]'>{payment.remaining_amount}</td>
                                <td className='border border-gray-300 px-4 py-2 font-[Poppins]'>{payment.payment_method}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className='mt-4 flex item-center justify-center'>
            <button
                    className={`mx-2 p-2 border ${currentPage === 1 ? 'opacity-50 cursor-not-allowed rounded-md shadow-lg' : 'hover:bg-green-800 hover:text-white rounded-md shadow-lg'}`}
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                    <button
                        key={pageNumber}
                        className={`mx-2 p-2 border ${currentPage === pageNumber ? 'bg-green-800 text-white rounded-full w-10 shadow-lg' : 'hover:bg-green-800 hover:text-white rounded-full w-10 shadow-lg'}`}
                        onClick={() => paginate(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}

                <button
                    className={`mx-2 p-2 border ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed rounded-md shadow-lg' : 'hover:bg-green-800 hover:text-white rounded-md shadow-lg'}`}
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            </div>
            )}
        </div>
    )
}

export default Transaction;