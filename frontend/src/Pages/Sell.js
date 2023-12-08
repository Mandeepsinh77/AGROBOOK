import React, { useState,useEffect } from 'react'
import ItemListForSell from "./ItemListForSell.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash , faPlus} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AppState} from "../App.js";
import Tooltip from "@mui/material/Tooltip";
import nullImg from "../images/nullImg.png"
import robot from '../images/robot.gif'

function Sell({  formData, setAddCustomer, setContact, setitemList, setAddItem, setcustomerList, setcategoryList, setSell, setPayment ,setInvoice }) {
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

     const [currentPage, setCurrentPage] = useState(1);
     const itemPerPage = 6; 
 
     const indexOfLastItem = currentPage * itemPerPage;
     const indexOfFirstItem = indexOfLastItem - itemPerPage;
     const currentItem = items.slice(indexOfFirstItem, indexOfLastItem);
 
     const totalPages = Math.ceil(items.length / itemPerPage);
 
     const paginate = (pageNumber) => {
         if (pageNumber >= 1 && pageNumber <= totalPages) {
             setCurrentPage(pageNumber);  
         }
     };

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
        fetch('http://localhost:4000/add/update_quantity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemname: item.itemname, quantity: item.quantity }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle the response if needed
                console.log(data.message)
            })
            .catch(error => {
                console.error('Error updating quantity: ', error);
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
        fetch('http://localhost:4000/add/update_quantity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemname: item.itemname, quantity: updatedItems.find((i) => i.itemname === item.itemname).quantity }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle the response if needed
                console.log(data.message);
            })
            .catch(error => {
                console.error('Error updating quantity: ', error);
            });
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
            shopkeeperid : userID,
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
                setInvoice(false)
                setPayment(true);
                navigate(`/dashboard?customerName=${formData.customerFirstname} ${formData.customerLastname}&totalCost=${totalCost}&customerPhone=${formData.customerPhone}`);
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
                                placeholder="Search Item"
                                className="border-4 rounded-md border-[#1F3F49] px-2 py-1 mr-2 w-[60%]"
                                onChange={e => setQuery(e.target.value)}
                            />

                        </div>
                        {items.length == 0 ?
                (<div className="flex flex-col items-center justify-center mt-36">
                    <img src={nullImg} alt="Description of the image" />
                    <h3>No Data</h3>
                </div>
                ) : (
                        <div className='mt-6 flex flex-col justify-center items-center'>

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
                                            <td className='border border-gray-300 px-4 py-2'>{index + 1 + (currentPage-1)*itemPerPage}</td>
                                            <td className='border border-gray-300 px-4 py-2'>{item.itemname}</td>
                                            <td className='border border-gray-300 px-4 py-2'>{item.itemcategory}</td>
                                            <td className='border border-gray-300 px-4 py-2'>{item.costprice}</td>
                                            <td className='border border-gray-300 px-4 py-2'>{item.sellingprice}</td>
                                            <td className='border border-gray-300 px-4 py-2'>{item.quantity}</td>
                                            <td className='border border-gray-300 px-4 py-2'>{item.units}</td>
                                            <td className='border border-gray-300 px-4 py-2 cursor-pointer'>
                                                        {item.quantity > 0 ? (
                                                            <Tooltip title='Add a Item'>
                                                                <button className='w-6 h-6 rounded-full text-white bg-gray-700' onClick={() => handleAddClick(item)}>
                                                                    <FontAwesomeIcon icon={faPlus} />
                                                                </button>
                                                            </Tooltip>
                                                        ) : (
                                                            // Render a disabled button when quantity is 0
                                                            <Tooltip title="Item Not Availabel">

                                                            <button className='w-6 h-6 rounded-full text-white bg-gray-400 cursor-not-allowed' disabled>
                                                                <FontAwesomeIcon icon={faPlus} />
                                                            </button>
                                                            </Tooltip>
                                                        )}
                                                    </td>
                                            {/* <td className='border border-gray-300 px-4 py-2 '><input type="text" className="narrow-column border-b-4" /></td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mt-4 flex items-center justify-center" >
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
                </div>
            </div>
            <div className='ml-5 md:w-2/6 w-2/5 '>
                <div className='w-full border mt-2 bg-green-500 rounded-md'>
                    <div className='p-1 font-bold text-center text-white'>
                        <span>Date: </span><span>{new Date().toDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + String(seconds).padStart(2, '0')}</span>
                    </div>
                </div>
                <div className='mt-4 w-full h-96 border-4 border-slate-500 rounded-md   overflow-y-auto p-4' >
                    <h2 className='font-bold py-2 text-white text-center rounded-xl shadow-xl bg-gray-700 w-full'> Selected Item Details : </h2>

                    {selectedItem.length === 0 ? (
                        <div className='flex flex-col p-2'>
                        <img src={robot} alt="" />
                        <p className='font-bold text-xl mx-auto'>Please Enter Item......</p>
                    </div>
                    ) : (
                        <ul className="list-none">
                            {selectedItem.map((item, index) => (
                                <li key={index} className="bg-white p-3 my-2 rounded-md shadow-md flex justify-between items-center">
                                    <div className="item-info">
                                        <div className='flex items-center mb-1'>
                                            <span className='font-bold text-md'>{index + 1 + "."}</span>
                                            <span className='font-bold ml-1 text-md'>{item.itemname}</span>
                                        </div>
                                        <div className='mb-1'>
                                            <span className='below-span text-sm'>Quantity: {item.quantity} {item.units}</span>
                                        </div>
                                        <div className='mb-1'>
                                            <span className='below-span text-sm'>Price: {item.sellingprice}</span>
                                        </div>
                                        <div className='mb-1'>
                                            <span className='below-span text-sm'>Category: {item.itemcategory}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="mr-2">
                                            <Tooltip title='Delete this Item'>
                                                <button className="text-red-500" onClick={() => handleRemoveItem(index, item)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </Tooltip>
                                        </p>
                                        <div className="font-bold">
                                            <span className='text-md'>Total Price:</span><br />
                                            <span className='ml-1 text-lg'>
                                                {item.totalPrice}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="font-bold flex justify-between items-center mt-5">
                    <span className='ml-4 text-lg'>Total Cost:</span>
                    <span className='mr-4 text-lg'>{totalCost}</span>
                </div>
                <Tooltip title='Next step to Payment'>
                    <button
                        onClick={handlePrintButtonClick}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-3 rounded w-full"
                    >
                        Proceed To Payment &rarr;
                    </button>
                </Tooltip>
            </div>
        </div>
    )
}

export default Sell