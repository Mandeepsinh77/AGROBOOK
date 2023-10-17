import React, {useState} from 'react';

function Footer() {
  return (
    <div className='sticky text-white bg-black'>
       <div className='bottom-0 mb-0 p-4 pt-20 md:h-80 upper_part flex flex-col justify-around md:flex-row md:justify-between'>
         <div className='footer_head md:w-1/2'>
          <div> 
           <h1 className='text-3xl font-bold '>AgroBook</h1>
           <p className='italic text-xl'>"Grow Your Business with AgroBook"</p>
          </div>
          <div className='mt-10 p-2'>
          <span className='p-3 text-2xl cursor-pointer hover:text-[#6AB187]'><ion-icon name="logo-linkedin"></ion-icon></span>
          <span className='p-3 text-2xl cursor-pointer hover:text-[#6AB187]'><ion-icon name="logo-facebook"></ion-icon></span>
          <span className='p-3 text-2xl cursor-pointer hover:text-[#6AB187]'><ion-icon name="logo-instagram"></ion-icon></span>
          <span className='p-3 text-2xl cursor-pointer hover:text-[#6AB187]'><ion-icon name="logo-twitter"></ion-icon></span>
          <span className='p-3 text-2xl cursor-pointer hover:text-[#6AB187]'><ion-icon name="mail-outline"></ion-icon></span>
          </div>
         </div>
         <div className='w-full md:w-1/4'> <h3 className='font-medium text-xl'>Quick Links</h3>
          <ul>
           <a className='cursor-pointer text-base hover:text-[#6AB187]'><li className='underline p-2'>Home</li></a>
           <a className='cursor-pointer text-base hover:text-[#6AB187]'><li className='underline p-2'>About Us</li></a>
           <a className='cursor-pointer text-base hover:text-[#6AB187]'><li className='underline p-2'>Service</li></a>
           <a className='cursor-pointer text-base hover:text-[#6AB187]'><li className='underline p-2'>Contact Us</li></a>
          </ul>
         </div> 
         <div className='w-full md:w-1/2'> <h3 className='font-medium text-xl'>Terms & Conditions</h3>
          <p>
          "Welcome to AgroBook! By using our platform, you agree to adhere to our terms and conditions. You must create an account to access our services and safeguard your login information. Please use AgroBook responsibly, share accurate information, and respect our copyright policies. We value your privacy. Misuse of our services, disruption of functionality, or any violation of our terms may result in account termination. We reserve the right to modify these terms and will notify you of significant changes. Thank you for choosing AgroBook."
          </p>
         </div> 
       </div>
       <div className='mt-0 top-0 h-20 lower_part flex place-content-around border-t-2  p-2'>
       <div className=''>
         <h5>AgroBook is an Application to make your Tracking account book task <span className='font-bold'>'SIMPLER'!!</span></h5>
         <h4 className='flex place-content-around'> Copyright &copy; 2023, AgroBook Made with love 🤍</h4>
         </div>         
       </div>
    </div>
  )
}

export default Footer
