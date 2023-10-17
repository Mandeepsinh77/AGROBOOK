import React, { useState } from 'react'
import ItemListForSell from "./ItemListForSell.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Sell({ formData }) {
    var today = new Date();
    // console.log("hi")
    // console.log(formData)
    //for select item from the table 
    const [selectedItem, setSelectedItem] = useState([]);

    const handleRemoveItem = (index) => {
        const updatedItems = selectedItem.filter((_, i) => i !== index);
        setSelectedItem(updatedItems);
    };

    return (
        <div className='flex'>
            <div className='md:w-4/6 w-3/5  p-4'>
                <div>
                    <table className=' border  rounded-md md:w-full w-full' >
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
                    <ItemListForSell selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
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
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 ml-36 mt-5 rounded">
                    Print
                </button>
            </div>
        </div>
    )
}

export default Sell