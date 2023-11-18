import React, {useEffect,useState} from 'react';
import nullImg from "../images/nullImg.png"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import {FcViewDetails,FcSalesPerformance} from 'react-icons/fc';
import {AiFillDelete,AiFillEdit} from 'react-icons/ai';
import { useContext } from 'react';
import { AppState } from "../App.js";
import Tooltip from "@mui/material/Tooltip";

function CustomerList({ setAddCustomer, setContact, setitemList, setAddItem, setcustomerList, setcategoryList, setSell, setFormData ,setPayment,setinvoice}){
    const[customers,setCustomers] = useState([]);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [editcustomer, setEditcustomer] = useState({});
    const [selected, setSelected] = useState(null);
    const [query, setQuery] = useState("");
    const [dataremain, setdataremain] = useState(0);
    const [customerStatus, setCustomerStatus] = useState({});

    const useAppState = useContext(AppState);
    const userID = useAppState.UserId;
    console.log(userID);

    const handleDeltecustomer = async (customerId) => {
        const confirmResult = await swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this customer!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });

        if (confirmResult) {
            try {
                const response = await fetch(`http://localhost:4000/add/deletecustomer/${customerId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Successful deletion, remove the customer from the state
                    setCustomers(customers.filter((customer) => customer._id !== customerId));
                    swal({
                        title: 'Success!',
                        text: 'Customer deleted successfully',
                        icon: 'success',
                        timer: 3000,
                    });
                } else {
                    // Handle non-successful responses
                    const errorData = await response.json();
                    console.log(errorData.message);
                    swal({
                        title: 'Error!',
                        text: errorData.message,
                        icon: 'error',
                        timer: 3000,
                    });
                }
            } catch (error) {
                // Handle network or client-side errors
                console.log('Error:', error);
                swal({
                    title: 'Error!',
                    text: 'An error occurred while deleting the customer',
                    icon: 'error',
                    timer: 3000,
                });
            }
        }
    };
    const handleEditCustomer = async () => {
        try {
            const response = await fetch(`http://localhost:4000/add/updatecustomer/${selected._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editcustomer),
            })

            if (response.ok) {
                const updatedCustomer = await response.json();
                setSelected(updatedCustomer.customer);
                swal({
                    title: "Success!",
                    text:"Customer Update Successfully",
                    icon:"success",
                    timer:3000
                })
                setOpen2(false);
                setOpen1(false);
                fetchCustomers();
            }
            else {
                const errorData = await response.json();
                console.log(errorData.message);
            }
        } catch (error) {
            console.log('Error :', error);
        }
    }

    const handleClickOpen1 = (customer) => {
        setSelected(customer); // Fix the state name
        setOpen1(true);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };
    const handleClickOpen2 = (customer) => {
        setSelected(customer);
        setEditcustomer({
            firstname: selected.firstname,
            middlename: selected.middlename,
            lastname: selected.lastname,
            email: selected.email,
            address: selected.address,
            city: selected.city,
            state: selected.state,
            country: selected.country,
            phoneno: selected.phoneno,
        })
        setOpen2(true);
    
    }

    console.log(query);

    const handleSetSell = (index, customer) => {
        //setFormData which is come from props

        setFormData({
            customerId: index + 1,
            customerFirstname: customer.firstname,
            customerLastname: customer.lastname,
            customerPhone: customer.phoneno
        });

        setAddItem(false)
        setContact(false)
        setitemList(false)
        setcategoryList(false)
        setAddCustomer(false)
        setcustomerList(false)
        setPayment(false)
        setinvoice(false)
        setSell(true)
    }

    const handleClickOpen3 = async (customer) => {
        try {
            console.log(customer);
            const res = await fetch(`http://localhost:4000/payment/fetch_remaining_amount/${customer.phoneno}`, {
                method: 'GET',
            });
            if (res.status === 200) { 
                const data = await res.json();
                console.log(data)
                // const payment = data.payment; 
                // console.log(payment[0].remaining_amount);
                const remaining_amount = data.remainingAmount; 
                console.log(remaining_amount)
                setCustomerStatus((prevStatus) => ({ 
                    ...prevStatus, 
                    [customer._id]: remaining_amount > 0 ? 'Pending' : 'Completed',    
                }));
                setdataremain(remaining_amount);
            } 
            else {
                console.log('Error fetching payment details.');
            }
        }   
        catch (error) {
            console.log(error); 
        }
    }
    console.log(dataremain);

    async function fetchCustomers(){
        try{
            const requestData = {
                userID: userID,
            };

        fetch('http://localhost:4000/add/fetch_customers',{
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
        })
        .then(response=>{
            if(!response.ok){
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(data => {
            setCustomers(data)
        }) 
        .catch(error=>{
            console.error('Error fetching Customers: ',error);

        })}
        catch(error){
            window.alert(error);
        }
    }

    useEffect(()=>{
        fetchCustomers();
        const initialCustomerStatus = customers.reduce((status, customer) => {
            status[customer._id] = 'Status';
            return status;
        }, {});  
        setCustomerStatus(initialCustomerStatus);
    },[]);

    return(
        <div className="container mx-auto">
        <h1 className='mt-8 font-bold bg-gray-700 w-full h-full text-white text-center mx-auto p-3 rounded-full uppercase shadow-lg'>Customer's Details</h1>
        <div className="mt-4  flex justify-center items-center ">
            <input
                type="text"
                placeholder="Search Customer"
                className="border-4 rounded-md border-[#1F3F49] px-2 py-1 mr-2 w-[60%] search_icon
                "
                onChange={e=>setQuery(e.target.value)}
            />
            {/* <button className="border rounded-md bg-green-500 text-white px-2 py-1">
                Search
            </button> */}
        </div>
        {customers.length == 0 ?
                (<div className="flex flex-col items-center justify-center mt-36">
                    <img src={nullImg} alt="Description of the image" />
                    <h3>No Data</h3>
                </div>
                ) : (
        <div className='ml-8 mt-8 flex justify-center items-center'>
            <table className="w-1/2 border-collapse">
                <thead className="text-center">
                    <tr>
                        <th className=" rounded-tl-xl border-gray-700 bg-gray-700 text-white  py-2 text-center text-xs font-medium uppercase">
                                <div className="">CID </div>
                            </th>
                            <th className=" border-gray-700 w-auto py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">First Name</div>
                            </th>
                            <th className=" border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Last Name</div>
                            </th>
                            <th className=" border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Phone No</div>
                            </th>
                            <th className=" border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Details</div>
                            </th>
                            <th className=" border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Edit</div>
                            </th>
                            <th className=" border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Sale</div>
                            </th>
                            <th className=" border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Status</div>
                            </th>
                            <th className=" border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Check</div>
                            </th>
                            <th className=" rounded-tr-xl border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Delete</div>
                            </th>
                    </tr>

                </thead>
                <tbody>
                    {customers.filter((customer)=>customer.firstname.toLowerCase().includes(query) || customer.lastname.toLowerCase().includes(query)||customer.phoneno.includes(query)).map((customer,index)=> (
                        <tr className='text-center capitalize hover:border-2 hover:border-black hover:rounded-md' style={{backgroundColor : index%2===0 ? '#f0f0f0' : '#f8f8f8' }} key={customer._id} >
                            <td className='border border-gray-300 px-4 py-2 m-2 rounded bg-[1F3F49]'><p className='bg-gray-700 text-white w-8 h-8 rounded-full mt-1'>{index + 1}</p></td>
                            <td className='border border-gray-300 px-4 py-2'>{customer.firstname}</td>
                            <td className='border border-gray-300 px-4 py-2'>{customer.lastname}</td>
                            <td className='border border-gray-300 px-4 py-2'>{customer.phoneno}</td>
                            <td className='border border-gray-200 px-4 py-2 customer_link text-blue-800'>
                                <Tooltip title='Customer Info'>
                                    <Button variant="outlined" onClick={() => handleClickOpen1(customer)}><FcViewDetails/> Details</Button>
                                </Tooltip>
                            </td>
                            <td className='border border-gray-200 px-4 py-2 customer_link text-blue-800'>
                                <Tooltip title='Customer Info Edit'>
                                    <Button variant="outlined" onClick={() => handleClickOpen2(customer)}><AiFillEdit/> Edit</Button>
                                </Tooltip>
                            </td>
                            <td className='border border-gray-200 px-4 py-2 customer_link text-blue-800'>
                                <Tooltip title='Sell to Customer'>
                                    <Button variant="outlined" onClick={() => { handleSetSell(index, customer) }}><FcViewDetails /> Sale</Button>
                                </Tooltip>
                            </td>
                            <td className='border border-gray-300 px-4 py-2 customer_link text-blue-500'>
                                    <a href="/status">
                                        <span style={{ color: customerStatus[customer._id] === 'Pending' ? 'red' : customerStatus[customer._id] === 'Completed' ? 'green' : 'blue' }}>
                                            {customerStatus[customer._id]}
                                        </span>
                                    </a>
                            </td>
                            <td className='border border-gray-200 px-4 py-2 customer_link'>
                                <Tooltip title='Payment status'>
                                    <Button variant="outlined" onClick={() => handleClickOpen3(customer)} style={{ color: "black", border: "2px solid black", fontWeight: "bold" }}> Check</Button>
                                </Tooltip>
                                </td>
                            <td className='border border-gray-200 px-4 py-2 customer_link'>
                            <Tooltip title='Delete Customer'>
                                    <Button variant="outlined" onClick={()=>handleDeltecustomer(customer._id)} style={{color:"red",border:"1px solid red"}}><AiFillDelete/> Delete</Button>
                            </Tooltip>
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
         )}
        <Dialog
                fullScreen
                open={open1}
                onClose={handleClose1}>
                {
                 selected && (
                        <>
                            <AppBar sx={{ position: 'relative', backgroundColor: '#6AB187', width:'100%' }}>
                                <Toolbar>
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        onClick={handleClose1}
                                        aria-label="close"
                                    >
                                     <CloseIcon />
                                    </IconButton>
                                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                        Customer's Details
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <Typography> 
                                <div className="min-h-screen bg-gray-100">
                                    <div className="w-full sm:w-11/12 md:w-9/12 lg:w-7/12 xl:w-1/2 mx-auto p-4">
                                        <div className="bg-white rounded-md p-2 shadow-lg">
                                            <p className="p-4 bg-gray-100 text-lg  flex items-center">
                                                <span className="w-1/2 font-bold">Customer's FirstName:</span>
                                                <span className="ml-4">{selected.firstname}</span>
                                            </p>
                                            <p className="p-4 bg-gray-50 text-lg  flex items-center">
                                                <span className="w-1/2 font-bold">Customer's MiddleName:</span>
                                                <span className="ml-4">{selected.middlename}</span>
                                            </p>
                                            <p className="p-4 bg-gray-100 text-lg flex items-center">
                                                <span className="w-1/2 font-bold">Customer's LastName:</span>
                                                <span className="ml-4">{selected.lastname}</span>
                                            </p>
                                            <p className="p-4 bg-gray-50 text-lg flex items-center">
                                                <span className="w-1/2 font-bold">Customer's EMail:</span>
                                                <span className="ml-4">{selected.email}</span>
                                            </p>
                                            <p className="p-4 bg-gray-100 text-lg flex items-center">
                                                <span className="w-1/2 font-bold">Customer's Address:</span>
                                                <span className="ml-4">{selected.address}</span>
                                            </p>
                                            <p className="p-4 bg-gray-50 text-lg flex items-center">
                                                <span className="w-1/2 font-bold">Customer's City:</span>
                                                <span className="ml-4">{selected.city}</span>
                                            </p>
                                            <p className="p-4 bg-gray-100 text-lg flex items-center">
                                                <span className="w-1/2 font-bold">Customer's State:</span>
                                                <span className="ml-4">{selected.state}</span>
                                            </p>
                                            <p className="p-4 bg-gray-50 text-lg flex items-center">
                                                <span className="w-1/2 font-bold">Customer's Country:</span>
                                                <span className="ml-4">{selected.country}</span>
                                            </p>
                                            <p className="p-4 bg-gray-100 text-lg flex items-center">
                                                <span className="w-1/2 font-bold">Customer's Phone:</span>
                                                <span className="ml-4">{selected.phoneno}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </Typography>
                        </>
                    )
                }


            </Dialog>
            <Dialog open={open2} onClose={handleClose2}>
                <DialogTitle style={{backgroundColor: '#6AB187'}} className='bg-green-700 text-white font-bold w-full h-full'>Edit Customer's Details</DialogTitle>
                <DialogContent className='mt-4' style={{ height: '400px', overflowY: 'auto' }}>
                    <TextField autoFocus style={{ marginBottom: "1rem" }} className='w-full' value={editcustomer.firstname} onChange={(e) => setEditcustomer({ ...editcustomer, firstname: e.target.value })} label="First Name" type="text" />
                    <TextField autoFocus style={{ marginBottom: "1rem" }} className='w-full' value={editcustomer.middlename} onChange={(e) => setEditcustomer({ ...editcustomer, middlename: e.target.value })} label="Middle Name" type="text" />
                    <TextField autoFocus style={{ marginBottom: "1rem" }} className='w-full' value={editcustomer.lastname} onChange={(e) => setEditcustomer({ ...editcustomer, lastname: e.target.value })} label="Last Name" type="text" />
                    <TextField autoFocus style={{ marginBottom: "1rem" }} className='w-full' value={editcustomer.email} onChange={(e) => setEditcustomer({ ...editcustomer, email: e.target.value })} label="Email" type="email" />
                    <TextField autoFocus style={{ marginBottom: "1rem" }} className='w-full' value={editcustomer.address} onChange={(e) => setEditcustomer({ ...editcustomer, address: e.target.value })} label="Address" type="text" />
                    <TextField autoFocus style={{ marginBottom: "1rem" }} className='w-full' value={editcustomer.city} onChange={(e) => setEditcustomer({ ...editcustomer, city: e.target.value })} label="City" type="text" />
                    <TextField autoFocus style={{ marginBottom: "1rem" }} className='w-full' value={editcustomer.state} onChange={(e) => setEditcustomer({ ...editcustomer, state: e.target.value })} label="State" type="text" />
                    <TextField autoFocus style={{ marginBottom: "1rem" }} className='w-full' value={editcustomer.country} onChange={(e) => setEditcustomer({ ...editcustomer, country: e.target.value })} label="Country" type="text" />
                    <TextField autoFocus style={{ marginBottom: "1rem" }} className='w-full' value={editcustomer.phoneno} onChange={(e) => setEditcustomer({ ...editcustomer, phoneno: e.target.value })} label="Phone no." type="text" />
                </DialogContent>
                <DialogActions>
                    <Button style={{ border: "1px solid #6AB187", color: "#6AB187" }} onClick={handleClose2}>Cancel</Button>
                    <Button style={{ backgroundColor: "#6AB187", color: "white" }} onClick={handleEditCustomer}>Edit</Button>
                </DialogActions> 
            </Dialog>  
    </div>
    )
}

export default CustomerList;