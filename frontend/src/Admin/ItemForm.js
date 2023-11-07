import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useContext } from 'react';
import { AppState } from "../App.js";

const ItemForm = () => {
    const useAppState = useContext(AppState);
    const userID = useAppState.UserId;

    const [categories, setCategories] = useState([]);
    // const [count,setCount] = useState(0);
    const [formData, setFormData] = useState(
        {
            shopkeeperid: userID,
            itemname: "",
            itemcategory: "",
            costprice: "",
            sellingprice: "",
            quantity: "",
            units: "Kilograms"
        }
    )

    const navigateTo = useNavigate();
    const handleGoToCategory = (event) => {
        const selectedOption = event.target.value;
        if (selectedOption == 'AddNew') {
            navigateTo("/");
        }
    }

    async function fetchCategory() {
        fetch("http://localhost:4000/category_crud/categories") // Use the correct URL for your backend endpoint
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            // console.log(data);
            setCategories(data);
          })
          .catch((error) => {
            console.error("Error fetching categories:", error);
          });
      }

      useEffect(() => {
        fetchCategory();
        console.log(categories);
      }, []); 

    const handleClear = ()=>{
        setFormData({
            shopkeeperid: userID,
            itemname: "",
            itemcategory: "",
            costprice: "",
            sellingprice: "",
            quantity: "",
            units: ""
        });
    }
    const handleAdditem = async (e) => {
        e.preventDefault();  
        if (
            formData.itemname === "" ||
            formData.itemcategory === "" ||
            formData.costprice === "" ||
            formData.sellingprice === "" ||
            formData.quantity === "" ||
            formData.units === ""

        ) {
            swal({
                title: "Please fill in all required fields",
                icon: "error",
                button: false,
                timer: 3000,
            });
            return;
        }

        const url = "http://localhost:4000/add/createitem"; 
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 200) {
                // Item added successfully
                swal({
                    title: "Item added successfully",
                    icon: "success",
                    button: false,
                    timer: 3000
                })
                // Clear the form
                setFormData({
                    shopkeeperid: userID,
                    itemname: "",
                    itemcategory: "",
                    costprice: "",
                    sellingprice: "",
                    quantity: "",
                    units: ""
                });
            } else {
                // Handle errors if necessary
                swal({
                    title: "Error Adding Item",
                    icon: "error",
                    button: false,
                    timer: 3000
                })
            }
        } catch (error) {
            console.error('Error adding Item:', error);
            swal({
                title: `Internal Server Error ${error}`,
                icon: "error",
                button: false,
                timer: 3000
            })
        }
    };

    return (
        <div className="item_form">
            <form action="">
                <h3 className="item_form_head">
                    Item Details
                </h3>
                <div className="item_content">
                    <div className="Item_inputs">
                        <div className="item_input_row">
                            <label htmlFor="name_items">Name: </label><br />
                            <input type="text" name="name_item" id="name_item" placeholder=' Enter Item Name '
                            value={formData.itemname}
                            required
                            onChange={(e) => setFormData({ ...formData, itemname: e.target.value })} />
                        </div>
                        <div className="item_input_row">
                            <label for="category">Category:</label><br />
                            <select id="item_category" 
                            value={formData.category}
                            required
                            onChange={(e) => setFormData({ ...formData, itemcategory: e.target.value })}
                            >
                             {categories.map((category) => (
                             <option key={category._id} value={category.category_name}>{category.category_name} </option>))}
                            </select>
                        </div>
                        <div className="item_input_row">
                            <label htmlFor="item_cp" >Cost Price:</label><br />
                            <input type="number" name="item_cp" id="item_cp" placeholder=' Enter Price ' 
                            value={formData.costprice}
                            required
                            onChange={(e) => setFormData({ ...formData, costprice: e.target.value })}
                            />
                        </div>
                        <div className="item_input_row">
                            <label htmlFor="item_sp">Selling Price:</label><br />
                            <input type="number" name="item_sp" id="item_sp" placeholder=' Enter Selling Price ' 
                            value={formData.sellingprice}
                            required
                            onChange={(e) => setFormData({ ...formData, sellingprice: e.target.value })}
                            />
                        </div>
                        <div className="qty_units">
                            <div className="qty_units_row">
                                <label htmlFor="item_qty">Quantity:</label><br />
                                {/* <button className="plus_item">-</button> */}
                                <input type="number" name="item_qty" id="item_qty" placeholder=' Enter Quantity' 
                                value={formData.quantity}
                                required
                                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                />
                                {/* <button className="minus_item">+</button> */}
                            </div>
                            <div className="qty_units_row">
                                <label htmlFor="item_unit">Units:</label><br />
                                <select id="item_units"
                                value={formData.units}
                                required
                                onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                                >
                                    <option value="Kg" selected>Kilograms</option>
                                    <option value="Lit">Litres</option>
                                    <option value="per unit">Unit/s</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item_input_row" id="customer_form_btn">
                                <div>
                                    <button type="submit" className="form_btn" onClick={handleAdditem}>Add Item</button>
                                    <button className="form_btn" type="reset" id="clear_btn" onClick={handleClear}>Clear</button>
                                </div>
                </div>
            </form>
        </div>
    );
}
export default ItemForm;