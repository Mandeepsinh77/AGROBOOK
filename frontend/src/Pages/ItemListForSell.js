import React, { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


function ItemListForSell({ selectedItem, setSelectedItem }) {
    const [items, setitems] = useState([]);
    const [query, setQuery] = useState("");
    const [availableQuantities, setAvailableQuantities] = useState({}); // State to track available quantities
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
    }

    const handleAddClick = (item) => {
        const existingItem = selectedItem.find((selected) => selected.itemname === item.itemname);

        if (existingItem) {
            // If the item already exists, update its quantity and total price
            const updatedItems = selectedItem.map((selected) => {
                if (selected.itemname === item.itemname) {
                    const updatedQuantity = selected.quantity + 1;
                    const updatedTotalPrice = (selected.quantity + 1) * item.sellingprice;
                    return { ...selected, quantity: updatedQuantity, totalPrice: updatedTotalPrice, unit: item.units, costprice: item.costprice };
                }
                return selected;
            });
            setSelectedItem(updatedItems);
        } else {
            // If the item doesn't exist, add it with quantity 1 and calculate total price
            // const updatedTotalPrice = item.sellingprice;
            setSelectedItem([...selectedItem, { ...item, quantity: 1, totalPrice: item.sellingprice, unit: item.units, costprice: item.costprice }]);
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


    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div className="container mx-auto">
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
                    <thead className="text-center">
                        <tr>
                            <th className=" rounded-tl-xl border-gray-700 bg-gray-700 text-white  py-2 text-center text-xs font-medium uppercase">
                                <div className="">Item ID</div>
                            </th>
                            <th className=" border-gray-700 w-auto py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Item Name</div>
                            </th>
                            <th className=" border-gray-700 w-auto py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Item Category</div>
                            </th>
                            <th className=" border-gray-700 w-auto py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Cost Price</div>
                            </th>
                            <th className=" border-gray-700 w-auto py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Selling Price</div>
                            </th>
                            <th className=" border-gray-700 w-auto py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Quantity</div>
                            </th>
                            <th className=" border-gray-700 w-auto py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Units</div>
                            </th>
                            <th className="rounded-tr-xl border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase " >
                                <div className="">ADD</div>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {items.filter((item) => item.itemname.toLowerCase().includes(query.toLowerCase()) || item.itemcategory.toLowerCase().includes(query.toLowerCase())).map((item, index) => (
                            <tr className='text-center capitalize hover:border-2 hover:border-black hover:rounded-md' style={{backgroundColor : index%2===0 ? '#f0f0f0' : '#f8f8f8' }}  key={index}>
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