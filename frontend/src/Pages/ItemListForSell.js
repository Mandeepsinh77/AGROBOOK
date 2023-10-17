import React, { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


function ItemListForSell({ selectedItem, setSelectedItem }) {
    const [items, setitems] = useState([]);
    const [query, setQuery] = useState("");
    // console.log(query);
    async function fetchItems() {
        fetch('http://localhost:4000/add/fetch_items')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then(data => {
                setitems(data)
                // console.log('Fetched Data:', data);
                // console.log(data[0].firstname)
            })
            .catch(error => {
                console.error('Error fetching Items: ', error);
            })
    }

    const handleAddClick = (item) => {
        const existingItem = selectedItem.find((selected) => selected.itemname === item.itemname);

        if (existingItem) {
            // If the item already exists, update its quantity and total price
            const updatedItems = selectedItem.map((selected) => {
                if (selected.itemname === item.itemname) {
                    const updatedQuantity = selected.quantity + 1;
                    const updatedTotalPrice = (selected.quantity + 1) * item.sellingprice;
                    return { ...selected, quantity: updatedQuantity, totalPrice: updatedTotalPrice, unit: item.units };
                }
                return selected;
            });
            setSelectedItem(updatedItems);
        } else {
            // If the item doesn't exist, add it with quantity 1 and calculate total price
            // const updatedTotalPrice = item.sellingprice;
            setSelectedItem([...selectedItem, { ...item, quantity: 1, totalPrice: item.sellingprice, unit: item.units }]);
            // setTotalPrice(item.sellingprice);
        }

        // Calculate the total price
        // const newTotalPrice = selectedItem.reduce((acc, selectedItem) => acc + selectedItem.totalprice, 0);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div className="container mx-auto">
            <div className="mt-4  flex justify-center items-center ">
                <input
                    type="text"
                    placeholder="Search Customer"
                    className="border rounded-md border-gray-300 px-2 py-1 mr-2 w-80 mt-2"
                    onChange={e => setQuery(e.target.value)}
                />

            </div>
            <div className='mt-6 flex justify-center items-center'>

                <table className="w-1/2 border-collapse border border-gray-300">
                    <thead className="text-center">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                                <div className="">Item ID</div>
                            </th>
                            <th className="border border-gray-300 px-4 w-auto py-2 text-center text-xs font-medium text-gray-500 uppercase">
                                <div className="">Item Name</div>
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                                <div className="">Item Category</div>
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                                <div className="">Cost Price</div>
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                                <div className="">Selling Price</div>
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                                <div className="">Quantity</div>
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                                <div className="">Units</div>
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase " >
                                <div className="">ADD</div>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {items.filter((item) => item.itemname.toLowerCase().includes(query.toLowerCase()) || item.itemcategory.toLowerCase().includes(query.toLowerCase())).map((item, index) => (
                            <tr className='text-center' key={index}>
                                <td className='border border-gray-300 px-4 py-2'>{index + 1}</td>
                                <td className='border border-gray-300 px-4 py-2'>{item.itemname}</td>
                                <td className='border border-gray-300 px-4 py-2'>{item.itemcategory}</td>
                                <td className='border border-gray-300 px-4 py-2'>{item.costprice}</td>
                                <td className='border border-gray-300 px-4 py-2'>{item.sellingprice}</td>
                                <td className='border border-gray-300 px-4 py-2'>{item.quantity}</td>
                                <td className='border border-gray-300 px-4 py-2'>{item.units}</td>
                                <td className='border border-gray-300 px-4 py-2 cursor-pointer'><button onClick={() => handleAddClick(item)}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button></td>
                                {/* <td className='border border-gray-300 px-4 py-2 '><input type="text" className="narrow-column border-b-4" /></td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    )

}

export default ItemListForSell