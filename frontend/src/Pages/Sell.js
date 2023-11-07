import React, { useState,useEffect } from 'react'
import ItemListForSell from "./ItemListForSell.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash , faPlus} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AppState} from "../App.js";

function Sell({  formData, setAddCustomer, setContact, setitemList, setAddItem, setcustomerList, setcategoryList, setSell, setPayment }) {
    var today = new Date();
    const useAppState = useContext(AppState);
    const userID = useAppState.UserId;

    const navigate = useNavigate();

     //for select item from the table 
     const [items, setitems] = useState([]);
     const [query, setQuery] = useState("");
     const [availableQuantities, setAvailableQuantities] = useState({}); // State to track available quantities
     const [selectedItem, setSelectedItem] = useState([]);
     const [totalCost, setTotalCost] = useState(0);
     const [paymentProps, setPaymentProps] = useState({ customerDetails: {}, totalCost: 0 });

     async function fetchItems() {
        try{
            const requestData = {
                userID: userID,
            };
        
        fetch('http://localhost:4000/add/fetch_items',{
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
                setitems(data)
                const quantities = {};
                data.forEach(item => {
                    quantities[item.itemname] = item.quantity; // Initialize available quantities
                });
                setAvailableQuantities(quantities);
                // console.log('Fetched Data:', data);
                // console.log(data[0].firstname)
            })
            .catch(error => {
                console.error('Error fetching Items: ', error);
            })
        }catch(err){
            window.alert(err);
        }
    }

    const markCustomerAsVisited = (customerId) => {
        // Send a POST request to your backend to mark the customer as visited
        fetch(`http://localhost:4000/customers/mark_visited/${customerId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error marking customer as visited');
                }
                // Handle the response or take further actions
            })
            .catch((error) => {
                console.error('Error marking customer as visited: ', error);
            });
     };

     const handleAddClick = (item) => {
        item.quantity = item.quantity-1;
        const existingItem = selectedItem.find((selected) => selected.itemname === item.itemname);

        if (existingItem) {
            // If the item already exists, update its quantity and total price
            const updatedItems = selectedItem.map((selected) => {
                if (selected.itemname === item.itemname) {
                    const updatedQuantity = selected.quantity + 1;
                    const updatedTotalPrice = (selected.quantity + 1) * item.sellingprice;
                    return { ...selected, quantity: updatedQuantity, totalPrice: updatedTotalPrice, unit: item.units, costprice: item.costprice,category:item.itemcategory };
                }
                return selected;
            });
            setSelectedItem(updatedItems);
        } else {
            // If the item doesn't exist, add it with quantity 1 and calculate total price
            // const updatedTotalPrice = item.sellingprice;
            setSelectedItem([...selectedItem, { ...item, quantity: 1, totalPrice: item.sellingprice, unit: item.units, costprice: item.costprice,category:item.itemcategory }]);
        }

        // const updatedQuantities = { ...availableQuantities };
        // updatedQuantities[item.itemname] -= 1;
        // setAvailableQuantities(updatedQuantities);

        // Fetch the updated quantities for the specific item
        fetch('http://localhost:4000/add/fetch_items')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const updatedQuantities = { ...availableQuantities };
                const selectedItemInData = data.find((dataItem) => dataItem.itemname === item.itemname);
                if (selectedItemInData) {
                    updatedQuantities[item.itemname] = selectedItemInData.quantity;
                }
                setAvailableQuantities(updatedQuantities);
            })
            .catch(error => {
                console.error('Error fetching Items: ', error);
            });
    };

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

    const handleRemoveItem = (index, item) => {
        // Get the quantity of the item to be removed
        const removedQuantity = selectedItem[index].quantity;
      
        // Update the items array to restore the original quantity
        const updatedItems = items.map((originalItem) =>
          originalItem.itemname === item.itemname
            ? { ...originalItem, quantity: originalItem.quantity + removedQuantity }
            : originalItem
        );
      
        // Update the selectedItem array to remove the item
        const updatedSelectedItems = selectedItem.filter((_, i) => i !== index);
      
        // Update both state variables
        setitems(updatedItems);
        setSelectedItem(updatedSelectedItems);
      };

    useEffect(() => {
        const newTotalCost = selectedItem.reduce((acc, item) => {
            const itemCost = item.sellingprice * item.quantity;
            return acc + itemCost;
        }, 0);
        setTotalCost(newTotalCost);
    }, [selectedItem])

    useEffect(() => {
        fetchItems();
    }, []);

    var today = new Date();
    const [seconds,setSeconds] = useState(new Date().getSeconds())

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(new Date().getSeconds());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

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
                itemcategory: item.itemcategory,
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
    };

    return (
        <div className='flex gap-8'>
            <div className='md:w-4/6 w-3/5  p-4'>
                <div>
                    <table className='border rounded-md w-full'>
                        <tbody>
                            <tr className='border border-white'>
                                <td className=' rounded-t-xl  ml-6 py-1 px-2 bg-gray-700 text-white'>Customer ID:  <span className=' px-2 py-2'>{formData.customerId}</span> </td>

                            </tr>
                            <tr className='border border-white'>

                                <td className='ml-6 py-1 px-2 bg-gray-700 text-white'>Customer Name: <span className='px-2 py-2'>{formData.customerFirstname} {formData.customerLastname}</span> </td>
                            </tr>
                            <tr className='border border-white'>

                                <td className=' rounded-b-xl ml-6 py-1 px-2 bg-gray-700 text-white'>Customer Phone No.: <span className='px-2 py-2'>{formData.customerPhone}</span> </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    {/* <ItemListForSell selectedItem={selectedItem}  setSelectedItem={setSelectedItem}  onQuantityChange={handleQuantityChange}  /> */}
                    <div className="container mx-auto mt-12">
                        <div className="mt-4  flex justify-center items-center ">
                            <input
                                type="text"
                                placeholder="Search Customer"
                                className="border-4 rounded-md border-[#1F3F49] px-2 py-1 mr-2 w-[60%]"
                                onChange={e => setQuery(e.target.value)}
                            />

                        </div>
                        <div className='mt-6 flex justify-center items-center'>

                            <table className="w-1/2 border-collapse">
                                <thead className="text-center " style={{ height: "50px" }}>
                                    <tr>
                                        <th className=" rounded-tl-xl border-gray-700 bg-gray-700 text-white  py-2 text-center text-xs font-medium uppercase">
                                            <div className="w-16">Item ID</div>
                                        </th>
                                        <th className=" border-gray-700 w-auto py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                            <div className="w-24">Item Name</div>
                                        </th>
                                        <th className=" border-gray-700 w-auto py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                            <div className="w-28">Item Category</div>
                                        </th>
                                        <th className=" border-gray-700 w-auto py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                            <div className="w-24">Cost Price</div>
                                        </th>
                                        <th className=" border-gray-700 w-auto py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                            <div className="w-24">Selling Price</div>
                                        </th>
                                        <th className=" border-gray-700 w-auto py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                            <div className="w-24">Quantity</div>
                                        </th>
                                        <th className=" border-gray-700 w-auto py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                            <div className="w-16">Units</div>
                                        </th>
                                        <th className="rounded-tr-xl border-gray-700 px-4 py-2   bg-gray-700 text-white text-center text-xs font-medium  uppercase " >
                                            <div className="w-2">ADD</div>
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {items.filter((item) => item.itemname.toLowerCase().includes(query.toLowerCase()) || item.itemcategory.toLowerCase().includes(query.toLowerCase())).map((item, index) => (
                                        <tr className='text-center capitalize hover:border-2 hover:border-black hover:rounded-md' style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#f8f8f8' }} key={index}>
                                            <td className='border border-gray-300 px-4 py-2'>{index + 1}</td>
                                            <td className='border border-gray-300 px-4 py-2'>{item.itemname}</td>
                                            <td className='border border-gray-300 px-4 py-2'>{item.itemcategory}</td>
                                            <td className='border border-gray-300 px-4 py-2'>{item.costprice}</td>
                                            <td className='border border-gray-300 px-4 py-2'>{item.sellingprice}</td>
                                            <td className='border border-gray-300 px-4 py-2'>{item.quantity}</td>
                                            <td className='border border-gray-300 px-4 py-2'>{item.units}</td>
                                            <td className='border border-gray-300 px-4 py-2 cursor-pointer'><button className='w-6 h-6 rounded-full text-white bg-gray-700 ' onClick={() => handleAddClick(item)}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button></td>
                                            {/* <td className='border border-gray-300 px-4 py-2 '><input type="text" className="narrow-column border-b-4" /></td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>

            <div className='ml-5 md:w-2/6 w-2/5 '>
                <div className=' border border-slate-500 mt-2 ml-16 w-4/5 bg-green-500 rounded-md'>
                    <div className=' ml-3 p-1 font-bold'>
                        <span>Date: </span><span>{new Date().toDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + String(seconds).padStart(2, '0')}</span>
                    </div>
                </div>
                <div className='mt-4 h-96 border border-slate-500 rounded-md   overflow-y-auto p-4' >
                    <h2 className='font-bold py-2 text-white text-center rounded-xl shadow-xl bg-gray-700 w-full'> Selected Item Details : </h2>

                    {selectedItem.length === 0 ? (
                        <p className='text-center font-bold mt-28'>Oops, No items selected.</p>
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
                                        <span className='below-span'>Category: {item.itemcategory}</span>
                                    </div>
                                    <p className="">
                                        <button onClick={() => handleRemoveItem(index, item)}> <FontAwesomeIcon icon={faTrash} /></button>
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