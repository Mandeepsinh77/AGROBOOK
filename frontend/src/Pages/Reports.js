import React, { useContext, useEffect, useState } from 'react'
import swal from 'sweetalert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AppState } from '../App';


function Report() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [transactionsPerPage] = useState(5);
    const [selectedOption, setSelectedOption] = useState(null);
    const [topSellingItems, setTopSellingItems] = useState([]);
    const [payments, setPayments] = useState([]);
    const useAppState = useContext(AppState);
    const shopkeeperid=useAppState.UserId;
    console.log("Ashish")
    console.log(shopkeeperid)

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        setCurrentPage(1); 
    };

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch('http://localhost:4000/transaction/selling-item-counts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ startDate, endDate, shopkeeperid }),
            });

                
            const response1 = await fetch('http://localhost:4000/payment/latest_payments_non_zero_remaining', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ shopkeeperid }),
            });

                const data = await response.json();
                console.log("helo",data)
                const data1 = await response1.json();
    
                console.log('Top Selling Items:', data.sellingItemCounts);
                console.log('Payments:', data1.payments);
    
                setTopSellingItems(data.sellingItemCounts);
                setPayments(data1.payments);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    
    useEffect(() => {
        console.log('Top Selling Items:', topSellingItems);
        console.log('Payments:', payments);
    }, [topSellingItems, payments]);
    
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;

    const totalPages = Math.ceil(
        selectedOption === 'topSellingItem'
            ? topSellingItems.length / transactionsPerPage
            : selectedOption === 'pendingPayment'
                ? payments.length / transactionsPerPage
                : transactions.length / transactionsPerPage
    );
    

    const currentData =
    selectedOption === 'topSellingItem'
        ? topSellingItems.slice(indexOfFirstTransaction, indexOfLastTransaction)
        : selectedOption === 'pendingPayment'  // Corrected from 'pendingPayments'
            ? payments.slice(indexOfFirstTransaction, indexOfLastTransaction)
            : transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);



    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    

    const handleShowButtonClick = async () => {
        if (!startDate || !endDate) {
            // Show warning using SweetAlert
            swal({
                title: "Warning",
                text: "Please enter both start and end dates.",
                icon: "warning",
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/transaction/getTransactionsByDateRange', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ startDate, endDate,shopkeeperid }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data.length === 0) {
                // Show error using Swal
                swal({
                    title: "No Data",
                    text: "There is no data between the selected dates.",
                    icon: "error",
                });

            } else {
                // Update the table with the fetched data
                setTransactions(data);
            }

        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };


    const handleClearButtonClick = () => {
        setStartDate('');
        setEndDate('');
        setTransactions([]);
        setCurrentPage(1);
    };
    const renderTable = () => {
        console.log(selectedOption)
        switch (selectedOption) {
            case 'topSellingItem':
                // Render table for top-selling item
                return (
                    <div className='mr-24 mt-8 flex justify-center items-center'>
                        <table className="w-1/2 border-collapse">
                            <thead className="text-center">
                                <tr >
                                    <th className=" rounded-tl-xl border-gray-700 bg-gray-700 text-white  py-2 text-center text-xs font-medium uppercase pl-10 pr-10">
                                        <div className="px-2 font-bold font-[Poppins]">Sr No.</div>
                                    </th>
                                    <th className=" border-gray-700 bg-gray-700 text-white  py-2 text-center text-xs font-medium uppercase pl-10 pr-10 ">
                                        <div className="px-2 font-bold font-[Poppins]">Item Name </div>
                                    </th>
                                    <th className="rounded-tr-xl border-gray-700 w-auto py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase pl-10 pr-10">
                                        <div className="px-2 font-bold font-[Poppins]">Number Of Transction</div>
                                    </th>
                                </tr>

                            </thead>
                            <tbody>
                                {currentData.map((item, index) => (
                                    <tr className='text-center capitalize hover:border-2 hover:border-black hover:rounded-md' style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#f8f8f8' }} key={index}>
                                        <td className='border border-gray-300 px-4 py-2 m-2 rounded bg-[1F3F49]'>
                                            <p className='bg-gray-700 text-white w-8 h-8 rounded-full mt-1 ml-8'>{index + 1 + (currentPage-1)*transactionsPerPage }</p>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 font-[Poppins]">{item.itemName}</td>
                                        <td className="border border-gray-300 px-4 py-2 font-[Poppins]">{item.count}</td>
                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>
                )
                break;
            case 'pendingPayment':
                // Render table for pending payment
                return (
                    <div className='mr-24 mt-8 flex justify-center items-center'>
                        <table className="w-1/2 border-collapse">
                            <thead className="text-center"> 
                                <tr >
                                    <th className=" rounded-tl-xl border-gray-700 bg-gray-700 text-white  py-2 text-center text-xs font-medium uppercase">
                                        <div className="px-2 font-bold font-[Poppins]">Sr No.</div>
                                    </th>
                                    <th className=" border-gray-700 w-auto py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                        <div className="px-2 pl-20 pr-20 font-bold font-[Poppins]">Customer Name</div>
                                    </th>

                                    <th className=" border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                        <div className="px-2 font-bold font-[Poppins]">Phone No</div>
                                    </th>
                                    <th className=" border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                        <div className="px-2 font-bold font-[Poppins]">Amount Paid</div>
                                    </th>
                                    <th className=" border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                        <div className="px-2 font-bold font-[Poppins]">Pending Amount</div>
                                    </th>
                                    <th className="rounded-tr-xl border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                        <div className="px-2 font-bold font-[Poppins]">Payment Method</div>
                                    </th>
                                </tr>

                            </thead>
                            <tbody>
                                {currentData.map((payment, index) => (
                                    <tr className='text-center capitalize hover:border-2 hover:border-black hover:rounded-md' style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#f8f8f8' }} key={payment._id}>
                                        <td className='border border-gray-300 px-4 py-2 m-2 rounded bg-[1F3F49]'><p className='bg-gray-700 text-white w-8 h-8 rounded-full mt-1 ml-3'>{index + 1 + (currentPage-1)*transactionsPerPage  }</p></td>
                                        <td className="border border-gray-300 px-4 py-2 font-[Poppins]">{payment.customername}</td>
                                        <td className="border border-gray-300 px-4 py-2 font-[Poppins]">{payment.customerphoneno}</td>
                                        <td className="px-4 py-2 border border-gray-300 font-[Poppins]">{payment.amountpaid}</td>
                                        <td className="px-4 py-2 border border-gray-300 font-[Poppins] text-red-800 font-bold">{payment.remaining_amount}</td>
                                        <td className="px-4 py-2 border border-gray-300 font-[Poppins]">{payment.payment_method}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>
                )
                break;
            case 'betweenDates':
                return (
                    <div className='mr-24 mt-8 flex justify-center items-center'>
                        <table className="w-1/2 border-collapse">
                            <thead className="text-center">
                                <tr >
                                    <th className=" rounded-tl-xl border-gray-700 bg-gray-700 text-white  py-2 text-center text-xs font-medium uppercase">
                                        <div className="px-2 font-bold font-[Poppins]">Sr No.</div>
                                    </th>
                                    <th className=" border-gray-700 bg-gray-700 text-white  py-2 text-center text-xs font-medium uppercase">
                                        <div className="px-2 font-bold font-[Poppins]">Customer ID </div>
                                    </th>
                                    <th className=" border-gray-700 w-auto py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                        <div className="px-2 font-bold font-[Poppins]">Customer Name</div>
                                    </th>

                                    <th className=" border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                        <div className="px-2 font-bold font-[Poppins]">Phone No</div>
                                    </th>
                                    <th className=" border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                        <div className="px- font-bold font-[Poppins]">Date</div>
                                    </th>
                                    <th className="rounded-tr-xl border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                        <div className="px-2 font-bold font-[Poppins]">Total Payment</div>
                                    </th>
                                </tr>

                            </thead>
                            <tbody>
                                {currentData.map((transaction, index) => (
                                    <tr className='text-center capitalize hover:border-2 hover:border-black hover:rounded-md' style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#f8f8f8' }} key={transaction._id}>
                                        <td className='border border-gray-300 px-4 py-2 m-2 rounded bg-[1F3F49]'><p className='bg-gray-700 text-white w-8 h-8 rounded-full mt-1'>{index + 1 + (currentPage-1)*transactionsPerPage }</p></td>
                                        <td className="border border-gray-300 px-4 py-2 font-[Poppins]">{transaction.customerId}</td>
                                        <td className="border border-gray-300 px-4 py-2 font-[Poppins]">{transaction.customerName}</td>
                                        <td className="border border-gray-300 px-4 py-2 font-[Poppins]">{transaction.customerPhone}</td>
                                        <td className="border border-gray-300 px-4 py-2 font-[Poppins]">{formatDate(transaction.date)}</td>
                                        <td className="px-4 py-2 border border-gray-300 font-[Poppins]">{transaction.totalPayment}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>
                )
                // Render table for data between two dates
                break;
            // Add more cases for other options...
            default:
                return null;
        }
    };


    return (
        <div className='flex flex-col justify-center items-center mt-8'>
            <h1 className='font-bold bg-gray-700 w-full h-full text-white text-center mx-auto p-3 rounded-full uppercase shadow-lg font-[Poppins]'>Report's Details</h1>
            <div className="flex flex-column justify-around mt-4 ">
                <input type="date" name="" id="" className='w-56 h-10 border-2 border-gray-800 rounded bg-gray-700 text-white p-2 mr-8  font-[Poppins]' value={startDate}
                    onChange={(e) => setStartDate(e.target.value)} />
                <input type="date" name="" id="" className='w-56 h-10 border-2 border-gray-800 rounded bg-gray-700 text-white p-2 font-[Poppins]' value={endDate}
                    onChange={(e) => setEndDate(e.target.value)} />
                <button className=' font-[Poppins] w-24 h-10 bg-green-800 text-white rounded-md shadow-lg hover:bg-white hover:text-black hover:border-green-800 hover:border-4 ml-8 ' disabled={selectedOption !== 'betweenDates'}  onClick={handleShowButtonClick}>
                    Show
                </button>
                <button className=' font-[Poppins] w-24 h-10 bg-red-800 text-white rounded-md shadow-lg hover:bg-white hover:text-black hover:border-red-800 hover:border-4 ml-2 mr-8 ' disabled={selectedOption !== 'betweenDates'} 
                    onClick={handleClearButtonClick}>
                    Clear
                </button>
                <FormControl variant="outlined" className='w-48'>
                    <InputLabel id="select-label" className='my-auto mr-8'>Select an option</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={selectedOption}
                        onChange={handleChange}
                        label="Select an option"
                        className='h-12'
                    >
                        <MenuItem value="betweenDates">Between Two Dates</MenuItem>
                        <MenuItem value="topSellingItem">Top Selling Items</MenuItem>
                        <MenuItem value="pendingPayment">Pending Payment</MenuItem>
                        {/* Add more options... */}
                    </Select>
                </FormControl>

            </div>
            {renderTable()}
            <div className="mr-20 mt-4 flex items-center justify-center">
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

    )
}

export default Report;