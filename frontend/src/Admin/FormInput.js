import React,{useState} from "react";
import "./App.css"
import swal from "sweetalert";
import { useContext } from 'react';
import { AppState } from "../App.js";

const FormInput = () =>{
    const useAppState = useContext(AppState);
    console.log("FormInput")
    console.log(useAppState.UserId)

    const [formData, setFormData] = useState(
        {
            shopkeeperid: useAppState.UserId,
            firstname: "",
            middlename: "",
            lastname: "",
            address: "",
            city: "",
            pincode: "",
            state: "",
            country: "",
            email: "",
            phoneno: ""

        }
    );
   const [currentDate,setCurrentDate] = useState(new Date());

    const handleSubmit = async (e) => {
        const url = "http://localhost:4000/add/createcustomer";
        e.preventDefault();    
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          
          if (response.status === 200) {
            // Customer added successfully
            swal({
                title: "Customer Added Successfully",
                icon: "success",
                button: false,
                timer: 3000
            })
            // Clear the form
            setFormData({
              shopkeeperid: useAppState.UserId,
              firstname: "",
              middlename: "",
              lastname: "",
              address: "",
              city: "",
              pincode: "",
              state: "",
              country: "",
              email: "",
              phoneno: ""
            });
          } else {
            // Handle errors if necessary
            swal({
                title: "Error Adding Customer",
                icon: "error",
                button: false,
                timer: 3000
            })
          }
        } catch (error) {
            swal({
                title: `Internal Server Error ${error}`,
                icon: "error",
                button: false,
                timer: 3000
            })
        }
      }

      const handleClear = ()=>{
        setFormData({
            shopkeeperid: useAppState.UserId,
            firstname: "",
            middlename: "",
            lastname: "",
            address: "",
            city: "",
            pincode: "",
            state: "",
            country: "",
            email: "",
            phoneno: ""
        });
    }

    return(  
        <>
       <div className="customer_form">
                <form action="" className="customer_form_details ml-12" >
                    <h3 className="customer_head">Customer Details</h3>
                    <div className="my_form" id="mytable">
                        <div className="form-row">
                            <label htmlFor="adding_date">Date: </label> <br />
                            <input type="" name="adding_date" id=""  value={currentDate.toDateString()} required/>
                        </div>
                        {/* <div className="form-row">
                            <label htmlFor="shopkeeper_id">Shopkeeper ID:</label><br />
                            <input
                                type="text"
                                id="shopkeeperid"
                                name="shopkeeperid"
                                value={formData.shopkeeperid}
                                onChange={(e) => setFormData({ ...formData, shopkeeperid: e.target.value })}
                                placeholder="Enter Your ID"
                                required
                            />
                        </div> */}
                        <div className="form-row">
                            <label htmlFor="name">Name: </label><br />
                            &nbsp;
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                className="capitalize"
                                value={formData.firstname}
                                onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                                placeholder="Firstname"
                                required
                            />
                           <input
                                type="text"
                                id="middlename"
                                name="middlename"
                                className="capitalize"
                                value={formData.middlename}
                                onChange={(e) => setFormData({ ...formData, middlename: e.target.value })}
                                placeholder="Middlename"
                                required
                            />
                           <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                className="capitalize"
                                value={formData.lastname}
                                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                                placeholder="Lastname"
                                required
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="address">Address: </label><br />
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className="capitalize"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                placeholder="Address"
                                required
                            />
                            <input
                                type="text"
                                id="city"
                                name="city"
                                className="capitalize"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                placeholder="city"
                                required
                            />
                            <input
                                type="text"
                                id="pincode"
                                name="pincode"
                                value={formData.pincode}
                                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                placeholder="pincode"
                                maxLength='6'
                                required
                            />
                            <input
                                type="text"
                                id="state"
                                name="state"
                                className="capitalize"
                                value={formData.state}
                                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                placeholder="state"
                                required
                            />
                             <input
                                type="text"
                                id="country"
                                name="country"
                                className="capitalize"
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                placeholder="country"
                                required
                            />
                            <div className="form-row phno_email" >
                            <label htmlFor="email">Email: </label><br />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="email"
                                required
                            />
                            <label htmlFor="phno" className="ml-14">Phone:</label ><br />
                            <input
                                type="text"
                                id="phoneno"
                                name="phoneno"
                                value={formData.phoneno}
                                onChange={(e) => setFormData({ ...formData, phoneno: e.target.value })}
                                placeholder="phoneno"
                                maxLength='10'
                                required
                            />
                            </div>
                        </div>
                        <div className="form-row" id="customer_form_btn">
                            <div>
                                <button  className="form_btn" onClick={handleSubmit}>Submit</button>
                                <button className="form_btn" id="clear_btn" onClick={handleClear}>Clear</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
    </>
    );
}

export default FormInput;