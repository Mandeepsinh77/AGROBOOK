import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { useContext } from 'react';
import { AppState } from "../App.js";

const Analysis = () => {
   const [count, setCount] = useState(0);
   const [customers,setCustomers] = useState(0);
   const[countCustomer,setCountCustomers] = useState(0);
   const [items,setItems] = useState(0);
   const [totalPayment, setTotalPayment] = useState(0);
   const [countItems, setCountItems] = useState(0);
   const countAnimationDuration = 2000;
   const [categories,setCategories] = useState(0);
   const [categoriesName, setCategoriesName] = useState([]);
   const [categoriesCount, setCategoriesCount] = useState([]);
   const useAppState = useContext(AppState);
   const userID = useAppState.UserId;


   async function categoriesGroupBy(){
      console.log('entered')
      await fetch('http://localhost:4000/fetch/item_grp_category')
      .then(response=>{
          if(!response.ok){
              throw new Error('Network response was not ok')
          }
          return response.json()
      })
      .then(data => {      
         // console.log('data ')
         setCategories(data); 
         const categoriesName1 = []
         const categoriesCount2 = []   
         // console.log(data)
         for (let key in categories) { 
            if (data.hasOwnProperty(key) && key!='null') {
               console.log(key,categories[key])
               categoriesName1.push(key);
              categoriesCount2.push(parseInt(categories[key])); 
            }    
          }  
          setCategoriesName(categoriesName1);
          setCategoriesCount(categoriesCount2);
          console.log(categoriesCount)
      })
      .catch(error=>{
          console.error('Error fetching Items: ',error);
      })
   }

  async function calculateTotalPayment() {
      await fetch('http://localhost:4000/save/fetch_transaction') // Replace with your actual endpoint
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Calculate the totalPayment
          const total = data.reduce((total, transaction) => total + transaction.totalPayment, 0);
          setTotalPayment(total);
        })
        .catch(error => {
          console.error('Error fetching Transactions: ', error);
        });
    }
    
  async function Customers(){
      // console.log("customer function")
      try{
        const requestData = {
            userID: userID,
        };
       await fetch('http://localhost:4000/add/fetch_items',{
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
           setCountCustomers(data.length); 
        })
        .catch(error=>{
            console.error('Error fetching Items: ',error);
        })
    }catch(err){
        window.alert(err);
    }
   }

   async function Items(){
      try{
         const requestData = {
             userID: userID,
         };
       await  fetch('http://localhost:4000/add/fetch_items',{
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
            setItems(data)
            setCountItems(data.length)
         })
         .catch(error=>{ 
             console.error('Error fetching Items: ',error);
         })
     }catch(err){
         window.alert(err);
     } 
   }
   useEffect(()=>{
      Customers();
      Items();
      calculateTotalPayment(); 
      categoriesGroupBy();
   },[count]); 

   useEffect(() => {
    // Update count after 2 seconds
    setTimeout(() => {
      setCount(count + 1);
    }, 1000);
  }, []);

  return (
    <div className='mt-8 flex flex-col justify-center items-center content-center'>
     <div className='text-xl font-medium rounded mb-10 px-10 py-2 bg-[#1F3F49] text-white'>Overview:</div>
        <div className='Upper_Part flex flex-col  items-center md:flex-row md:gap-12'>
         <div className=' mb-4 w-44 h-28 my-auto rounded text-white bg-[#6AB187]  flex flex-col justify-center items-center content-center'>
            <div className='text-3xl font-medium'>{customers.length}</div>
            <div>Customers</div>
         </div>
         <div className='mb-4 w-44 h-28 my-auto rounded text-white bg-[#6AB187] flex flex-col justify-center items-center content-center'>
            <div className='text-3xl font-medium'>{countItems}</div>
            <div>Items</div>
         </div>
         <div title={`₹${totalPayment.toLocaleString()}`} className=' mb-4 w-44 h-28  my-auto rounded text-white bg-[#6AB187] flex flex-col justify-center items-center content-center'>
            <div className='text-3xl font-medium'>₹{(totalPayment / 1000).toFixed(2)}K</div>
            <div>Sales</div>
         </div>
        </div>
     <div className='mt-4 mb-12 lower_part w-[90%] md:flex flex-row place-content-around'>
        <div className='pie_chart border-2 p-8'>
         {/* <h3>Category</h3> */}
           
         <Chart
         type='pie'
         width={400}
         height={300}

         series={categoriesCount}

         options={{
            title:{text:"Category wise Sales"},
            noData:{text:'Empty Data'},
            labels:categoriesName
         }}
         >

         </Chart>
        </div>
        {/* <div className='bar_chart border-2'>
        <h3>Sales on a monthly basis</h3>
        </div> */}
     </div>
    </div>
  )
}

export default Analysis;
