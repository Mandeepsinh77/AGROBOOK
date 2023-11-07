import React from 'react'
import image1 from '../images/AgroService1.png';
import image2 from '../images/AgroService2.png';
import image3 from '../images/AgroService3.jpeg';
import imgge4 from '../images/AgroService4.png';
import image5 from '../images/AgroService5.png';
import image6 from '../images/AgroService6.jpeg';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
   offset: 200,
   duration: 800,
   easing: 'ease-in-out',
   once: true,
 });


const Service = () => {
  return (
    <div className='w-full h-full bg-gray-100 p-2 '>
        <h1 className=' text-4xl text-center pt-7 mb-6 relative after:block after:content-[attr(data-content)] after:bg-green-900 after:w-20 after:h-2 after:absolute after:top-19 after:w-36 after:rounded-2xl after:left-1/2 after:transform after:-translate-x-1/2 font-[Poppins]'>Our Services</h1>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-x-8 mt-12">
            <div data-aos='fade-down-right' className="relative bg-transparent text-center p-6 ml-3 rounded-lg text-sm cursor-pointer bg-[linear-gradient(#fffff 50%,#2c7bfe 50%)] bg-[100% 100%] bg-[0 2.5%] border-green-900 rounded-md p-4  border-b-8  bg-cover rounded-lg hover:bg-green-900 hover:text-white hover:scale-105 transition-transform duration-500 transition-background duration-500">
               <img src={image1} className='w-[10rem] h-[10rem] rounded-full mx-auto' alt="" />
               <h2 className='font-bold text-2xl font-[600]'>Customers</h2>
               <br />
               <p className='text-left'>Welcome to our comprehensive range of agricultural services designed to empower farmers, growers, and agribusinesses. At AgroBook, we understand the diverse needs of the agricultural community and offer tailored solutions to maximize productivity, sustainability, and profitability.</p>
            </div>
            <div data-aos='fade-down' className="relative bg-transparent text-center p-6 ml-3 rounded-lg text-sm cursor-pointer bg-[linear-gradient(#fffff 50%,#2c7bfe 50%)] bg-[100% 100%] bg-[0 2.5%] border-green-900 rounded-md p-4  border-b-8  bg-cover rounded-lg hover:bg-green-900 hover:text-white hover:scale-105 transition-transform duration-500 transition-background duration-500"> 
               <img src={image2} className='w-[10rem] h-[10rem] rounded-full mx-auto border-4 border-white' alt="" />
               <h2 className='font-bold text-2xl font-[600]'>Accessories</h2>
               <br />
               <p className='text-left'>Enhance your farming experience with our top-notch Accessories Services. We offer a wide range of agricultural accessories designed to optimize your workflow and boost productivity. From precision tools to innovative equipment, our collection ensures you have everything you need to take your farming to the next level.</p>
            </div>
            <div data-aos='fade-down-left' className="relative bg-transparent text-center p-6 ml-3 rounded-lg text-sm cursor-pointer bg-[linear-gradient(#fffff 50%,#2c7bfe 50%)] bg-[100% 100%] bg-[0 2.5%] border-green-900 rounded-md p-4  border-b-8  bg-cover rounded-lg hover:bg-green-900 hover:text-white hover:scale-105 transition-transform duration-500 transition-background duration-500"> 
               <img src={image3} className='w-[10rem] h-[10rem] rounded-full mx-auto border-4' alt="" />
               <h2 className='font-bold text-2xl font-[600]'>History</h2>
               <br />
               <p className='text-left '>Delve into the rich tapestry of agricultural heritage with our History Services. Explore the evolution of farming practices, from ancient traditions to modern innovations. Our History Services offer a captivating journey through time, uncovering the stories of pioneering farmers, groundbreaking techniques, and the profound impact of agriculture on society.</p>
            </div>
            <div data-aos='fade-up-right' className="relative bg-transparent text-center p-6 ml-3 rounded-lg text-sm cursor-pointer bg-[linear-gradient(#fffff 50%,#2c7bfe 50%)] bg-[100% 100%] bg-[0 2.5%] border-green-900 rounded-md p-4  border-b-8  bg-cover rounded-lg hover:bg-green-900 hover:text-white hover:scale-105 transition-transform duration-500 transition-background duration-500  mt-12"> 
            <img src={imgge4} className='w-[10rem] h-[10rem] rounded-full mx-auto border-4 border-white' alt="" />
               <h2 className='font-bold text-2xl font-[600]'>Innovative Solutions</h2>
               <br />
               <p className='text-left'> Our Innovative Solutions Services harness the latest technologies and research to offer you groundbreaking solutions. From automated crop monitoring systems to sustainable farming practices, we empower you to stay at the forefront of agricultural innovation.</p>
            </div>
            <div data-aos='fade-up' className="relative bg-transparent text-center p-6 ml-3 rounded-lg text-sm cursor-pointer bg-[linear-gradient(#fffff 50%,#2c7bfe 50%)] bg-[100% 100%] bg-[0 2.5%] border-green-900 rounded-md p-4  border-b-8  bg-cover rounded-lg hover:bg-green-900 hover:text-white hover:scale-105 transition-transform duration-500 transition-background duration-500  mt-12"> 
            <img src={image5} className='w-[10rem] h-[10rem] rounded-full mx-auto  border-white' alt="" />
               <h2 className='font-bold text-2xl font-[600]'>Generating Invoice</h2>
               <br />
               <p className='text-left'> Experience the convenience and efficiency of modern invoicing with Agrobook's "Generating Invoices" service. Our automated platform creates customizable invoices, accurately calculates taxes, and offers flexible payment options. Real-time tracking and integration with accounting software.</p>
            </div>
            <div data-aos='fade-up-left' className="relative bg-transparent text-center p-6 ml-3 rounded-lg text-sm cursor-pointer bg-[linear-gradient(#fffff 50%,#2c7bfe 50%)] bg-[100% 100%] bg-[0 2.5%] border-green-900 rounded-md p-4  border-b-8  bg-cover rounded-lg hover:bg-green-900 hover:text-white hover:scale-105 transition-transform duration-500 transition-background duration-500  mt-12"> 
            <img src={image6} className='w-[10rem] h-[10rem] rounded-full mx-auto border-4 border-white' alt="" />
               <h2 className='font-bold text-2xl font-[600]'>Printing Invoice</h2>
               <br />
               <p className='text-left'> Elevate your business operations with Agrobook's "Printing Invoices" service. We understand the importance of tangible records, which is why we offer seamless invoice printing solutions. Generate polished and professional invoices from our platform, and effortlessly print them for your clients or records.</p>
            </div>
        </div>
    </div>
  )
}

export default Service

