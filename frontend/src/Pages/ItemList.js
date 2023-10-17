import React, {useEffect,useState} from 'react';


function ItemList(){
    const[items,setitems] = useState([]);
    const [query, setQuery] = useState("");
    console.log(query);
    async function fetchItems(){
        fetch('http://localhost:4000/add/fetch_items')
        .then(response=>{
            if(!response.ok){
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(data => {
            setitems(data)
            console.log('Fetched Data:', data);
            console.log(data[0].firstname)
        })
        .catch(error=>{
            console.error('Error fetching Items: ',error);
        })
    }

    useEffect(()=>{
        fetchItems();
    },[]);

    return(
        <div className="container mx-auto">
        <div className="mt-4  flex justify-center items-center">
            <input
                type="text"
                placeholder="Search Item"
                className="border rounded-md border-gray-300 px-2 py-1 mr-2 w-[40%] bg-[#1F3F49] text-white"
                onChange={e=>setQuery(e.target.value)}
            />
            {/* <button className="border rounded-md bg-green-500 text-white px-2 py-1">
                Search
            </button> */}
        </div>
        <div className='mt-8 flex justify-center items-center'>

            <table className="w-1/2 border-collapse border border-gray-300">
                <thead className="text-center bg-[#6AB187]">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-center text-xs font-medium text-black-500 uppercase">
                            <div className="">Item ID</div>
                        </th>
                        <th className="border border-gray-300 px-4 w-auto py-2 text-center text-xs font-medium text-black-500 uppercase">
                            <div className="">Item Name</div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center text-xs font-medium text-black-500 uppercase">
                            <div className="">Item Category</div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center text-xs font-medium text-black-500 uppercase">
                            <div className="">Cost Price</div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center text-xs font-medium text-black-500 uppercase">
                            <div className="">Selling Price</div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center text-xs font-medium text-black-500 uppercase">
                            <div className="">Quantity</div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center text-xs font-medium text-black-500 uppercase">
                            <div className="">Units</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.filter((item)=>item.itemname.toLowerCase().includes(query.toLowerCase()) || item.itemcategory.toLowerCase().includes(query.toLowerCase())).map((item,index)=> (
                        <tr className='text-center myRow' key={index}>
                            <td className='border border-gray-300 px-4 py-2'>{index+1}</td>
                            <td className='border border-gray-300 px-4 py-2'>{item.itemname}</td>
                            <td className='border border-gray-300 px-4 py-2'>{item.itemcategory}</td>
                            <td className='border border-gray-300 px-4 py-2'>{item.costprice}</td>
                            <td className='border border-gray-300 px-4 py-2'>{item.sellingprice}</td>
                            <td className='border border-gray-300 px-4 py-2'>{item.quantity}</td>
                            <td className='border border-gray-300 px-4 py-2'>{item.units}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    </div>
    )
}

export default ItemList ;
