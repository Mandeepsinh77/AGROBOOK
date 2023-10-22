import React, {useEffect,useState} from 'react';
import swal from 'sweetalert';

function ItemList(){
    const[items,setitems] = useState([]);
    const [query, setQuery] = useState("");
    const [order,setOrder] = useState('ASC');
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
        })
        .catch(error=>{
            console.error('Error fetching Items: ',error);
        })
    };
    const sorting = (col) =>{
        if(order==='ASC'){
            const sorted = [...items].sort((a,b)=>
            parseInt(a[col]) > parseInt(b[col]) ? 1 : -1);
            setitems(sorted);
            setOrder('DSC');
        }
        if(order==='DSC'){
            const sorted = [...items].sort((a,b)=>
            parseInt(a[col]) < parseInt(b[col]) ? 1 : -1);
            setitems(sorted);
            setOrder('ASC');
        }
    }
    
    const handleDeleteItem = async (Id)=>{
        console.log("ljl")
        console.log(Id);

        let data = await fetch(`http://localhost:4000/delete/deleteItem/${Id}`,{
          method : 'delete',
          headers : {
            'Content-Type' : 'application/json'
          }
        })
        console.log(data)
        const res = await data.json();
        swal({
          title: "Item deleted succesfully",
          icon: "success",
          button: false,
          timer: 3000
        })
        fetchItems();
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
                className="border-4 rounded-md border-[#1F3F49] px-2 py-1 mr-2 w-[60%]"
                onChange={e=>setQuery(e.target.value)}
            />
        </div>
        <div className='mt-8 flex justify-center items-center'>

            <table className=" border-collapse">
                <thead className="text-center">
                    <tr>
                        <th className=" rounded-tl-xl border-gray-700 bg-gray-700 px-4 py-4 text-white  text-center text-xs font-medium uppercase">
                            <div className="" >Item ID</div>
                        </th>
                        <th className="border-gray-700 w-auto py-2  bg-gray-700 px-4 py-4 text-white  text-center text-xs font-medium  uppercase">
                            <div className="">Item Name</div>
                        </th>
                        <th className="border-gray-700 w-auto py-2  bg-gray-700 px-4 py-4 text-white text-center text-xs font-medium  uppercase">
                            <div className="">Item Category</div>
                        </th>
                        <th onClick={()=>sorting("costprice")} className="border-gray-700 w-auto py-2  bg-gray-700  px-4 py-4 text-white text-center text-xs font-medium  uppercase cursor-pointer">
                            <div className="flex flex-row">Cost Price 
                            <img width="20" height="20" className='ml-2'src="https://img.icons8.com/pastel-glyph/64/000000/sorting-arrows--v1.png" alt="sorting-arrows--v1"/>
                            </div>
                        </th>
                        <th onClick={()=>sorting("sellingprice")} className="border-gray-700 w-auto py-2  bg-gray-700 px-4 py-4 text-white text-center text-xs font-medium  uppercase cursor-pointer">
                            <div className="flex flex-row">Selling Price<img width="20" height="20" className='ml-2'src="https://img.icons8.com/pastel-glyph/64/000000/sorting-arrows--v1.png" alt="sorting-arrows--v1"/></div>
                        </th>
                        <th onClick={()=>sorting("quantity")} className="border-gray-700 w-auto py-2  bg-gray-700 px-4 py-4 text-white text-center text-xs font-medium  uppercase cursor-pointer">
                            <div className="flex flex-row">Quantity<img width="20" height="20" className='ml-2'src="https://img.icons8.com/pastel-glyph/64/000000/sorting-arrows--v1.png" alt="sorting-arrows--v1"/></div>
                        </th>
                        <th className="border-gray-700 w-auto py-2  bg-gray-700 px-4 py-4 text-white text-center text-xs font-medium  uppercase">
                            <div className="">Units</div>
                        </th>
                        <th className=" rounded-tr-xl border-gray-700 px-4 py-2 px-4 py-4  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                            <div className="">Delete</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.filter((item)=>item.itemname.toLowerCase().includes(query.toLowerCase()) || item.itemcategory.toLowerCase().includes(query.toLowerCase())).map((item,index)=> (
                        <tr className='text-center capitalize hover:border-2 hover:border-black hover:rounded-md'style={{backgroundColor:index%2===0 ? '#f0f0f0' : '#f8f8f8' }} key={index}>
                            <td className='border border-gray-300 px-4 py-2 m-2 rounded bg-[1F3F49]'><p className='bg-gray-700 text-white w-8 h-8 rounded-full mt-1'>{index + 1}</p></td>
                            <td className='border border-gray-300 px-4 py-2'>{item.itemname}</td>
                            <td className='border border-gray-300 px-4 py-2'>{item.itemcategory}</td>
                            <td className='border border-gray-300 px-4 py-2'>{item.costprice}</td>
                            <td className='border border-gray-300 px-4 py-2'>{item.sellingprice}</td>
                            <td className='border border-gray-300 px-4 py-2'>{item.quantity}</td>
                            <td className='border border-gray-300 px-4 py-2'>{item.units}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        className="category_del_btn"
                                        onClick={() => handleDeleteItem(item._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    </div>
    )
}

export default ItemList ;
