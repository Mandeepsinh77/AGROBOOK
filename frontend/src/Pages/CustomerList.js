import React, {useEffect,useState} from 'react';
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
import {FcViewDetails} from 'react-icons/fc';
import {AiFillDelete} from 'react-icons/ai';

function CustomerList({ setAddCustomer, setContact, setitemList, setAddItem, setcustomerList, setcategoryList, setSell, setFormData }){
    const[customers,setCustomers] = useState([]);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [editcustomer, setEditcustomer] = useState({});
    const [selected, setSelected] = useState(null);
    const [query, setQuery] = useState("");

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const handleDeltecustomer = async (customerId) => {
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
    const handleClickOpen2 = () => {
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
        setSell(true)
    }

    async function fetchCustomers(){
        try{
        fetch('http://localhost:4000/add/fetch_customers')
        .then(response=>{
            if(!response.ok){
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(data => {
            setCustomers(data)
            console.log('Fetched Data:', data);
            console.log(data[0].firstname)
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
    },[]);

    return(
        <div className="container mx-auto">
        <div className="mt-4  flex justify-center items-center ">
            <input
                type="text"
                placeholder="Search Customer"
                className="border rounded-md border-gray-300 px-2 py-1 mr-2 w-[60%]"
                onChange={e=>setQuery(e.target.value)}
            />
            {/* <button className="border rounded-md bg-green-500 text-white px-2 py-1">
                Search
            </button> */}
        </div>
        <div className='mt-16 flex justify-center items-center'>

            <table className="w-1/2 border-collapse">
                <thead className="text-center">
                    <tr>
                        {/* <th className="border border-gray-300 px-4 py-2 text-center text-xs font-medium text-black-500 uppercase">
                            <div className="">CID</div>
                        </th>
                        <th className="border border-gray-300 px-4 w-auto py-2 text-center text-xs font-medium text-black-500 uppercase">
                            <div className="">First Name</div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center text-xs font-medium text-black-500 uppercase">
                            <div className="">Last Name</div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center text-xs font-medium text-black-500 uppercase">
                            <div className="">Phone No</div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center text-xs font-medium text-black-500 uppercase">
                            <div className="">Details</div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center text-xs font-medium text-black-500 uppercase">
                            <div className="">Sale</div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center text-xs font-medium text-black-500 uppercase">
                            <div className="">Payment History</div>
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-center text-xs font-medium text-black-500 uppercase">
                            <div className="">Status</div>
                        </th> */}
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
                                <div className="">Sale</div>
                            </th>
                            <th className=" border-gray-700 px-4 py-2 bg-gray-700 text-white  text-center text-xs font-medium  uppercase">
                                <div className="">Payment History</div>
                            </th>
                            <th className=" border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Status</div>
                            </th>
                            <th className=" rounded-tr-xl border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Delete</div>
                            </th>
                    </tr>
                </thead>
                <tbody>
                    {customers.filter((customer)=>customer.firstname.toLowerCase().includes(query) || customer.lastname.toLowerCase().includes(query)||customer.phoneno.includes(query)).map((customer,index)=> (
                        <tr className='text-center hover:border-2 hover:border-black hover:rounded-md'style={{backgroundColor:index%2===0 ? '#f0f0f0' : '#f8f8f8' }} key={customer._id} >
                            <td className='border-2 border-gray-300 px-4 py-2 m-2 rounded bg-[1F3F49]'><p className='bg-gray-700 text-white w-8 h-8 rounded-full mt-1'>{index + 1}</p></td>
                            <td className='border-2 border-gray-300 px-4 py-2'>{customer.firstname}</td>
                            <td className='border-2 border-gray-300 px-4 py-2'>{customer.lastname}</td>
                            <td className='border-2 border-gray-300 px-4 py-2'>{customer.phoneno}</td>
                            <td className='border border-gray-200 px-4 py-2 customer_link text-blue-800'>
                                    <Button variant="outlined" onClick={() => handleClickOpen1(customer)}><FcViewDetails/> Details</Button>
                                </td>
                                <td className='border border-gray-200 px-4 py-2 customer_link text-blue-800'>
                                    <Button variant="outlined" onClick={() => { handleSetSell(index, customer) }}><FcViewDetails /> Sale</Button>
                                </td>
                            <td className='border-2 border-gray-300 px-4 py-2 customer_link text-blue-500 underline'><a href="#">Payments</a></td>
                            <td className='border-2 border-gray-300 px-4 py-2 customer_link text-blue-500 underline'><a href="#">Status</a></td>
                            <td className='border border-gray-200 px-4 py-2 customer_link'>
                                    <Button variant="outlined" onClick={()=>handleDeltecustomer(customer._id)} style={{color:"red",border:"1px solid red"}}><AiFillDelete/> Delete</Button>
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
        <Dialog
                fullScreen
                open={open1}
                onClose={handleClose1}
                TransitionComponent={Transition}
            >
                {
                 selected && (
                        <>
                            <AppBar sx={{ position: 'relative', backgroundColor: '#6AB187' }}>
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
                                    <Button autoFocus color="inherit" onClick={handleClickOpen2}>
                                        Edit Customer
                                    </Button>

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