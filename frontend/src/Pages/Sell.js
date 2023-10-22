import React, { useState,useEffect } from 'react'
import ItemListForSell from "./ItemListForSell.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Sell({  formData, setAddCustomer, setContact, setitemList, setAddItem, setcustomerList, setcategoryList, setSell, setPayment }) {
    var today = new Date();

    const navigate = useNavigate();

     //for select item from the table 
     const [selectedItem, setSelectedItem] = useState([]);
     const [totalCost, setTotalCost] = useState(0);
     const [paymentProps, setPaymentProps] = useState({ customerDetails: {}, totalCost: 0 });

     const handleQuantityChange = (item, updatedQuantity) => {
        // Clone the selected items to update the quantity
        const updatedItems = selectedItem.map((selected) => {
            if (selected.itemname === item.itemname) {
                // Update the quantity, total price, and available quantity
                const updatedTotalPrice = updatedQuantity * item.sellingprice;
                return { ...selected, quantity: updatedQuantity, totalPrice: updatedTotalPrice, unit: item.units, costprice: item.costprice };
            }
            return selected;
        });

        // Update selected items and available quantities
        setSelectedItem(updatedItems);

        // You can fetch the updated available quantity from the server here
        // and update it in the ItemListForSell component.
    };

    const handleRemoveItem = (index) => {
        const updatedItems = selectedItem.filter((_, i) => i !== index);
        setSelectedItem(updatedItems);
    };

    useEffect(() => {
        const newTotalCost = selectedItem.reduce((acc, item) => {
            const itemCost = item.sellingprice * item.quantity;
            return acc + itemCost;
        }, 0);
        setTotalCost(newTotalCost);
    }, [selectedItem])

    const handlePrintButtonClick = () => {
        // console.log("hello world")

        // Prepare the data to be sent to your server
        // const dataToSave = {
        //     customerId: formData.customerId,
        //     customerName: formData.customerFirstname + ' ' + formData.customerLastname,
        //     customerPhone: formData.customerPhone,
        //     date: today,
        //     // Include the total cost
        //     items: selectedItem.map((item,index) => ({
        //         itemNo:(index+1).toString(),
        //         itemname: item.itemname,
        //         costPrice: item.costprice,
        //         sellingPrice: item.sellingprice,
        //         unit:item.units,
        //         quantity: item.quantity,
        //         totalPriceOfItem:item.totalPrice
        //     })),
        //     totalPayment: totalCost
        // };
        // console.log("jmj")
        // console.log(dataToSave)
        // console.log("jmj")


        // fetch('http://localhost:4000/save/save_transaction', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(dataToSave),
        // })
        //     .then((response) => {
        //         if (!response.ok) {
        //             throw new Error('Error saving transaction');
        //         }
        //         return response.json();
        //     })
        //     .then((data) => {
        //         console.log('Transaction saved successfully');
        //         // Handle success as needed (e.g., reset the selected items)
        //         setSelectedItem([]);
        //     })
        //     .catch((error) => {
        //         console.error('Error saving transaction:', error);
        //         // Handle errors as needed
        //     });

        // setShowPaymentPage(true);


        Swal.fire({
            title: 'Proceed to Payment?',
            text: 'Are you sure you want to proceed to payment?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, proceed',
            cancelButtonText: 'No, cancel',
        }).then((result) => {
            if (result.isConfirmed) {

                
        // Prepare the data to be sent to your server
        const dataToSave = {
            customerId: formData.customerId,
            customerName: formData.customerFirstname + ' ' + formData.customerLastname,
            customerPhone: formData.customerPhone,
            date: today,
            // Include the total cost
            items: selectedItem.map((item,index) => ({
                itemNo:(index+1).toString(),
                itemname: item.itemname,
                costPrice: item.costprice,
                sellingPrice: item.sellingprice,
                unit:item.units,
                quantity: item.quantity,
                totalPriceOfItem:item.totalPrice
            })),
            totalPayment: totalCost
        };
        console.log("jmj")
        console.log(dataToSave)
        console.log("jmj")


        fetch('http://localhost:4000/save/save_transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSave),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error saving transaction');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Transaction saved successfully');
                // Handle success as needed (e.g., reset the selected items)
                setSelectedItem([]);
            })
            .catch((error) => {
                console.error('Error saving transaction:', error);
                // Handle errors as needed
            });

                // User confirmed, proceed to payment
                setAddItem(false);
                setitemList(false);
                setAddCustomer(false);
                setContact(false);
                setSell(false);
                setcustomerList(false);
                setcategoryList(false);
                setPayment(true);
                navigate(`/?customerName=${formData.customerFirstname} ${formData.customerLastname}&totalCost=${totalCost}&customerPhone=${formData.customerPhone}`);
            }
        });

        // setAddItem(false)
        // setitemList(false)
        // setAddCustomer(false)
        // setContact(false)
        // setSell(false)
        // setcustomerList(false);
        // setcategoryList(false)
        // setPayment(true)

      
        // navigate(`/?customerName=${formData.customerFirstname} ${formData.customerLastname}&totalCost=${totalCost}&customerPhone=${formData.customerPhone}`);
    };

    return (
        <div className='flex'>
            <div className='md:w-4/6 w-3/5  p-4'>
                <div>
                    <table className='border rounded-md md:w-full w-full' >
                        <tbody className=''>
                            <tr className='border border-slate-700'>
                                <span className='ml-6'>Customer ID : </span><span>{formData.customerId}</span>
                            </tr>
                            <tr className='border border-slate-700'>
                                <span className='ml-6'>Customer Name : </span><span>{formData.customerFirstname}  {formData.customerLastname}</span>
                            </tr>
                            <tr className='border border-slate-700 '>
                                <span className='ml-6'>Customer Phone No. : </span><span>{formData.customerPhone}</span>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <ItemListForSell selectedItem={selectedItem} setSelectedItem={setSelectedItem} onQuantityChange={handleQuantityChange} />
                </div>
            </div>

            <div className='ml-5 md:w-2/6 w-2/5 '>
                <div className=' border border-slate-500 mt-2 ml-16 w-4/5 bg-green-500 rounded-md'>
                    <div className=' ml-3 p-1 font-bold' >
                        <span>Date: </span><span>{new Date().toDateString() + ''}</span>
                    </div>
                </div>
                <div className='mt-4 h-96 border border-slate-500 rounded-md   overflow-y-auto p-4' >
                    <h2 className='font-bold py-2 ml-20'>Selected Item Details : </h2>
                    {selectedItem.length === 0 ? (
                        <p >No items selected.</p>
                    ) : (
                        <ul>
                            {selectedItem.map((item, index) => (
                                <li key={index} className="item-details">
                                    <div className="item-info">
                                        <div className='flex'>
                                            <span className='font-bold'>{index + 1 + "."}</span>
                                            <span className='font-bold'>{item.itemname}</span><br />
                                        </div>
                                        <span className='below-span'>Quantity: {item.quantity} {item.units}</span>
                                        <span className='below-span'>Price: {item.sellingprice}</span>
                                    </div>
                                    <p className="">
                                        <button onClick={() => handleRemoveItem(index)}> <FontAwesomeIcon icon={faTrash} /></button>
                                    </p>
                                    <div className="font-bold">
                                        <span>Total Price:</span><br />
                                        <span className='ml-2'>
                                            {item.totalPrice}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="font-bold flex justify-between">
                    <span className='ml-10 mt-5'>Total Cost:</span><br />
                    <span className='mr-10 mt-5'>{totalCost}</span>
                </div>
                <button onClick={handlePrintButtonClick}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 ml-36 mt-5 rounded"
                >
                    Proceed To Payment
                </button>
            </div>
        </div>
    )
}

export default Sell