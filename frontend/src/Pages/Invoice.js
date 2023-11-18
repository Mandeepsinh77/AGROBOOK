import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AppState } from "../App.js";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useData } from '../useContext/DataContext';
import nullImage from "../images/nullImg.png";
import { Tooltip } from '@mui/material';

function Invoice() {
    const [customers, setCustomers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [query, setQuery] = useState("")
    const useAppState = useContext(AppState);
    const userID = useAppState.UserId;
    const navigate = useNavigate();
    const { data, shopname } = useData();

    // const handleInvoice=(customer)=>{
    //        navigate(`/bill?customerName=${customer.firstname} ${customer.lastname}&customerPhone=${customer.phoneno}`);
    // }

    async function fetchTransactions() {
            try {
                const requestData = {
                    shopkeeperid: userID,
                };
            fetch('http://localhost:4000/transaction/fetch_transactions',{
                method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                    }
            ).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
                .then(data => {
                    setTransactions(data)
                    console.log(transactions)
                })
                .catch(error => {
                    console.error('Error fetching Customers: ', error);

                })
        }
        catch (error) {
            window.alert(error);
        }
    }

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div className="container mx-auto">
            <h1 className='mt-7 font-bold bg-gray-700 w-full h-full text-white text-center mx-auto p-3 rounded-full uppercase shadow-lg'>Invoice</h1>
            <Tooltip title='Search Invoice'>
            <div className="mt-4  flex justify-center items-center ">
                <input
                    type="text"
                    placeholder="Search Invoice"
                    className="border-4 rounded-md border-[#1F3F49] px-2 py-1 mr-2 w-[60%] search_icon
                "
                    onChange={e => setQuery(e.target.value)}
                />
            </div>
            </Tooltip>
            {transactions.length == 0 ?
                (<div className="flex flex-col items-center justify-center mt-36">
                    <img src={nullImage} alt="Description of the image" />
                    <h3>No Data</h3>
                </div>
                ) : (
            <div className='mt-8 flex justify-center items-center'>
                <table className="w-3/4 border-collapse">
                    <thead className="text-center">
                        <tr>
                            <th className=" rounded-tl-xl border-gray-700 bg-gray-700 text-white  py-2 text-center text-xs font-medium uppercase">
                                <div className="">CID </div>
                            </th>
                            <Tooltip title='YYYY-MM-DD'>
                            <th className=" border-gray-700 w-auto py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Date of Sell</div>
                            </th> 
                            </Tooltip>
                            <th className=" border-gray-700 w-auto py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Customer Name</div>
                            </th>
                            <th className=" border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Phone No</div>
                            </th>

                            <th className=" rounded-tr-xl border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Invoice</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.filter((transaction) => transaction.customerName.toLowerCase().includes(query.toLowerCase()) || transaction.customerPhone.includes(query)).map((transaction, index) => (
                            <tr className='text-center capitalize hover:border-2 hover:border-black hover:rounded-md' style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#f8f8f8' }} key={transaction._id} >
                                <td className='border border-gray-300 px-4 py-2 m-2 rounded bg-[1F3F49]'><p className='bg-gray-700 text-white w-8 h-8 rounded-full mt-1'>{index + 1}</p></td>
                                <td className='border border-gray-300 px-4 py-2'>{transaction.date.slice(0,10)}</td>
                                <td className='border border-gray-300 px-4 py-2'>{transaction.customerName}</td>
                                {/* <td className='border border-gray-300 px-4 py-2'>{customer.lastname}</td> */}
                                <td className='border border-gray-300 px-4 py-2'>{transaction.customerPhone}</td>
                                <td className='border border-gray-300 px-4 py-2'>
                                    <Link to={`/bill?name=${transaction.customerName} &phoneno=${transaction.customerPhone} &time=${transaction.date}`}>
                                        <Tooltip title='Generate Invoice'>
                                        <button className="invoice_btn">INVOICE</button>
                                        </Tooltip>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
                )}
        </div>
    )
}

export default Invoice;