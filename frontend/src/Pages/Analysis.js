import React from 'react'

const Analysis = () => {
  return (
    <div className='mt-8 flex flex-col justify-center items-center content-center'>
     <div className='text-xl font-medium rounded mb-10 px-10 py-2 bg-[#1F3F49] text-white'>Overview:</div>
        <div className='Upper_Part flex flex-row'>
         <div className='mr-20 w-44 h-28 my-auto rounded text-white bg-[#6AB187] flex flex-col justify-center items-center content-center'>
            <div className='text-3xl font-medium'>100</div>
            <div>Customers</div>
         </div>
         <div className='w-44 h-28 mr-20 my-auto rounded text-white bg-[#6AB187] flex flex-col justify-center items-center content-center'>
            <div className='text-3xl font-medium'>49</div>
            <div>Items</div>
         </div>
         <div className='w-44 h-28  my-auto rounded text-white bg-[#6AB187] flex flex-col justify-center items-center content-center'>
            <div className='text-3xl font-medium'>₹100k</div>
            <div>Sales</div>
         </div>
        </div>
     <div className='lower_part'>
        <div className='pie_chart'></div>
        <div className='bar_chart'></div>
     </div>
    </div>
  )
}

export default Analysis;
