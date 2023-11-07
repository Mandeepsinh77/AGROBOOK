import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { AiFillDelete } from "react-icons/ai";
import { Button } from "@mui/material";
import {IoMdAddCircle} from "react-icons/io";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  useEffect(() => {
    fetchCategory();
    console.log(categories[0]);
  }, []); // Empty dependency array means this effect runs once on component mount

  const handleAddCategory = (e) => {
    if (newCategory.trim() === "") {
      return;
    }

    if (categories.some((category) => category.category_name === newCategory)) {
      // alert("Category already exists."); // You can show an alert or handle it in another way
      swal({
        title: "Category already exists",
        icon: "error",
        button: false,
        timer: 3000
      })
      setNewCategory("");
      return;
    }
    try {
      e.preventDefault();
      addNewCategory();
      // fetchCategory();
    } catch (error) {
      window.alert(error);
    }
  };

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

  async function addNewCategory() {
    const url = "http://localhost:4000/category_crud/newcategory";
    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newCategory }),
    });

    const res = await data.json();
    console.log(res);
    swal({
      title: "Category Added succesfully",
      icon: "success",
      button: false,
      timer: 3000
    })
    setNewCategory("");

    fetchCategory();
  }

  const handleDeleteCategory = async (Id) => {
    const confirmResult = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
  });
   
    if(confirmResult){

      let data = await fetch(`http://localhost:4000/category_crud/delete-Category/${Id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(data)
      const res = await data.json();
      swal({
        title: "Category deleted succesfully",
        icon: "success",
        button: false,
        timer: 3000
      })
      fetchCategory();
    }
  }

  // const changeColor = (selectedRow)=>{
  //   if (selectedRow !== undefined) {
  //     setChangeColor({ selectedRow  });
  //   }
  // }
  return ( 
    <div className="container mx-auto">
      <h1 className='mt-7 font-bold bg-gray-700 w-full h-full text-white text-center mx-auto p-3 rounded-full uppercase shadow-lg'>Category's Details</h1>
      <div className="mt-4  flex justify-center items-center ">
        <input
          type="text"
          id="category_name"
          placeholder="Add a new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border-4 rounded-md border-[#1F3F49] px-2 py-1 mr-2 w-[40%]"
        />
        <Button variant="outlined" onClick={handleAddCategory} style={{ color: "green", border: "3px solid green",fontWeight:"bold"}}><IoMdAddCircle /> Add</Button>
      </div>
      <div className="mt-8 flex justify-center items-center">
        <table className="w-1/2 border-collapse">
          <thead className="text-center">
            <tr>
              <th className=" rounded-tl-xl border-gray-700 bg-gray-700 text-white  py-2 text-center text-xs font-medium uppercase">
                <div className="mr-10">ID</div>
              </th>
              <th className=" border-gray-700 w-auto py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                <div className="">Name</div>
              </th>
              <th className="rounded-tr-xl border-gray-700 px-4 py-2  bg-gray-700 text-white text-center text-xs font-medium  uppercase">Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories? categories && categories.map((category, index) => (
              // {console.log(category.category_name)}
              <tr className="text-center capitalize category_row hover:border-2 hover:border-black hover:rounded-md" style={{backgroundColor : index%2===0 ? '#f0f0f0' : '#f8f8f8' }} key={index}>
                <td className='border border-gray-300 px-2 py-2 ml-2 rounded bg-[1F3F49]'><p className='bg-gray-700 text-white w-8 h-8 rounded-full mt-1'>{index + 1}</p>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {category.category_name}
                </td>
                <td className='border border-gray-200 px-4 py-2 customer_link'>
                  <Button variant="outlined" onClick={() => handleDeleteCategory(category._id)} style={{ color: "red", border: "2px solid red" ,fontWeight:"bold"}}><AiFillDelete /> Delete</Button>
                </td>
              </tr>
            )) : "No Data"}
          </tbody>
        </table>
      </div>
    </div>
  );

}

export default CategoryList;
