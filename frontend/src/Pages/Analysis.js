import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
// import {Bar} from 'react-apexcharts';
import { useContext } from 'react';
import { AppState } from "../App.js";
import Tooltip from "@mui/material/Tooltip";

const Analysis = () => {
   const [count, setCount] = useState(0);
   const [customers,setCustomers] = useState(0);
   const[countCustomer,setCountCustomers] = useState(0);
   const [items,setItems] = useState(0);
   const [totalPayment, setTotalPayment] = useState(0);
   const [countItems, setCountItems] = useState(0);
   const [categories,setCategories] = useState(0);
   const [categoriesName, setCategoriesName] = useState([]);
   const [categoriesCount, setCategoriesCount] = useState([]);
   const [monthlySales, setMonthlySales] = useState([]);
   const [Months,setMonths] = useState([]);
   const [MonthVal,setMonthVal] = useState([]);
   
   const useAppState = useContext(AppState);
    const userID = useAppState.UserId;
    const monthly = {}

   async function categoriesGroupBy(){
    const requestData = {
      shopkeeperid: userID,
     };
      console.log('entered')
      await fetch('http://localhost:4000/fetch/item_grp_category',{
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
            }) // Replace with your actual endpoint)
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

    const requestData = {
      shopkeeperid: userID,
     };
      await fetch('http://localhost:4000/save/fetch_transaction',{
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
            }) // Replace with your actual endpoint
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          // Calculate the totalPayment
          setMonthlySales(data);
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
       await fetch('http://localhost:4000/add/fetch_customers',{
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

   async function groupSalesByMonth(){
    const groupData = {};
      monthlySales.forEach(entry=>{
        const date = new Date(entry.date);
        const options = {
          month: 'short',
          year: 'numeric'
        };

        const month = date.toLocaleString('default',options);

        if(!groupData[month]) {
          groupData[month] = [];
        }
        
        groupData[month].push(entry);
      });

      Object.entries(groupData).forEach(([month,entries])=>{
        const totalSales = entries.reduce((total,entry)=> total+entry.totalPayment,0);
        monthly[month] = totalSales;
      })
      console.log(monthly)
    setMonths(Object.keys(monthly));
    setMonthVal(Object.values(monthly));
    console.log(MonthVal)
   }

   useEffect(()=>{
      Customers();
      Items();
      calculateTotalPayment(); 
      categoriesGroupBy();
      groupSalesByMonth();
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
          <Tooltip title="Number of Customers">
         <div className=' mb-4 w-44 h-28 my-auto rounded text-white bg-[#6AB187]  flex flex-col justify-center items-center content-center'>
            <div className='text-3xl font-medium'>{customers.length}</div>
            <div>Customers</div>
         </div>
         </Tooltip> 
         <Tooltip title="Number of items">
         <div className='mb-4 w-44 h-28 my-auto rounded text-white bg-[#6AB187] flex flex-col justify-center items-center content-center'>
            <div className='text-3xl font-medium'>{countItems}</div>
            <div>Items</div>
         </div>
         </Tooltip>
         <Tooltip title={`₹${totalPayment.toLocaleString()}`} >
         <div title={`₹${totalPayment.toLocaleString()}`} className=' mb-4 w-44 h-28  my-auto rounded text-white bg-[#6AB187] flex flex-col justify-center items-center content-center'>
            <div className='text-3xl font-medium'>₹{(totalPayment / 1000).toFixed(2)}K</div>
            <div>Sales</div>
         </div>
         </Tooltip>
        </div>
     <div className='mt-4 mb-12 lower_part w-[90%] md:flex flex-row place-content-around p-2'>
        <div className='pie_chart md:flex flex-row items-center border-2 mr-4 '>
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
        <div className='bar_chart border-2 p-8'>
        <Chart 
        type='bar'
        width={600}
        height={400}
        series={[{ data: MonthVal }]}
        options={{
           title: { text: 'Sales month wise' },
           noData: { text: 'Empty Data' },
           xaxis: { categories: Months },
         }}
       />
        </div>
     </div>
    </div>
  )
}

export default Analysis;
