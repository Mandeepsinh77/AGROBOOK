import React, { useState } from 'react'
import Navbar from "../component/Navbar.js"
import Itemtable from '../component/Itemtable.js';
import { Link } from 'react-router-dom';

import Contact from '../component/Contact.js';
import AddCustomer from '../Admin/FormInput.js';
import ItemForm from '../Admin/ItemForm.js';
import CategoryList from './CategoryList.js';
import CustomerList from "./CustomerList.js";
import ItemList from './ItemList.js';
import Sell from './Sell.js';
// import { Link } from 'react-router-dom'
export default function Dashboard() {
    const links = [
        { name: "Home", link: "/" },
        { name: "About", link: "/about" },
        { name: "Services", link: "/services" },
        { name: "Contact Us", link: "/contact" },
        { name: "Dashboard", link: "/dashboard" },
    ];

     //for sell page
     const [formData, setFormData] = useState(
        {
            customerId: "",
            customerFirstname: "",
            customerLastname: "",
            customerPhone: ""
        }
    )

    const [history, sethistory] = useState(false);
    const [contact, setContact] = useState(false);
    const [customerList, setcustomerList] = useState(false);
    const [itemList, setitemList] = useState(false);
    const [recent, setrecent] = useState(false);
    const [invoice, setnvoice] = useState(false);
    const [addCustomer, setAddCustomer] = useState(false);
    const [addItem, setAddItem] = useState(false);
    const [categoryList, setcategoryList] = useState(false);
    const [sell, setSell] = useState(false);
    
    
    return (
        <>
            <div className='md:h-20 h-12'>
                <Navbar links={links} setAddCustomer={setAddCustomer} setitemList={setitemList} setContact={setContact} setAddItem={setAddItem} setcategoryList={setcategoryList} setcustomerList={setcustomerList}/>
            </div>
            <div className='flex flex-row mb-2 '>
                <div className='md:w-1/6 w-2/4 bg-gray-200 border-2 p-4 my_side_bar' >
                    <table className='place-items-center w-full text-[#1F3F49] capitalize md:text-xl font-medium tracking-wide'>
                        <tr className={`border-b-2 mt-2 hover:bg-gray-300 hover:text-black border-slate-500 h-20  flex items-center justify-center  cursor-pointer `}>
                        <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/control-panel--v2.png" alt="control-panel--v2" className='mr-3'/> DashBoard
                        </tr>
                        <tr className='mt-2 border-b-2  hover:bg-gray-300 hover:text-black border-slate-500 h-20  flex items-center justify-center  cursor-pointer'>
                            History
                        </tr>
                        <tr className={`mt-2 border-b-2 hover:bg-gray-300 hover:text-black border-slate-500 h-20  flex items-center justify-center  cursor-pointer ${customerList ? 'bg-[#1F3F49] text-white' : ''}`}>
                        <Link to="/" onClick={() => {
                                setAddItem(false)
                                setContact(false)
                                setAddCustomer(false)
                                setcategoryList(false)
                                setitemList(false)
                                setSell(false)
                                setcustomerList(true);
                            }}>
                            Customer List
                        </Link>
                        </tr>
                        <tr className={`mt-2 border-b-2 hover:bg-gray-300 hover:text-black border-slate-500 h-20  flex items-center justify-center cursor-pointer ${itemList ? 'bg-[#1F3F49] text-white' : ''}`}>
                            <Link to="/" onClick={() => {
                                setAddItem(false)
                                setContact(false)
                                setAddCustomer(false)
                                setcategoryList(false)
                                setitemList(true)
                                setSell(false)
                                setcustomerList(false);
                            }}>
                                Item List
                            </Link>
                        </tr>
                        <tr className={`mt-2 border-b-2 hover:bg-gray-300 hover:text-black  border-slate-500 h-20  flex items-center justify-center  cursor-pointer ${categoryList ? 'bg-[#1F3F49] text-white' : ''}`}>
                            <Link to="/" onClick={() => {
                                setAddItem(false)
                                setitemList(false)
                                setAddCustomer(false)
                                setContact(false)
                                setSell(false)
                                setcustomerList(false);
                                setcategoryList(true)
                            }}>
                                categoryList
                            </Link>
                        </tr>
                        <tr className='mt-2 border-b-2 hover:bg-gray-300 hover:text-black border-slate-500 h-20  flex items-center justify-center  cursor-pointer'>
                            Invoice
                        </tr>

                        <tr className='hover:uppercase mt-4 h-20 flex  hover:bg-gray-300 items-center  justify-center  cursor-pointer'>

                        </tr>
                    </table>
                </div>
                <div className='md:w-3/4 w-2/4 ml-72'>
                    {itemList ? <Itemtable /> : contact ? <Contact /> : addCustomer ? <AddCustomer /> : addItem ? <ItemForm /> : categoryList ? <CategoryList /> : customerList ? <CustomerList setAddCustomer={setAddCustomer} setitemList={setitemList} setContact={setContact} setAddItem={setAddItem} setcategoryList={setcategoryList} setcustomerList={setcustomerList} setSell={setSell} setFormData={setFormData}/> : sell ? <Sell formData={formData} /> : null}
                </div>
            </div>
        </>
    )
}