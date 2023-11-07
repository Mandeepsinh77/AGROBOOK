import React, { useEffect} from 'react';
import emailjs from 'emailjs-com';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
   offset: 200,
   duration: 800,
   easing: 'ease-in-out',
   once: true,
 });

const Contact = () => {

    useEffect(() => {
        emailjs.init('u002GheV__IQcQxJc');
      }, []);

      const handleSubmit = (e) => {
        e.preventDefault();
      
        const templateParams = {
          from_name: e.target.from_name.value,
          to_name: e.target.to_name.value,
          message: e.target.message.value,
        };
      
        emailjs
          .send('service_5kxzzkj', 'template_kpptflx', templateParams)
          .then(
            (response) => {
              console.log('Email sent successfully:', response);
            },
            (error) => {
              console.error('Email sending failed:', error);
            }
          );

          
      };
      

    return (
        <div className='w-full h-full p-4 mt-10 bg-green-950 text-white'>
            <h1 className='text-4xl text-center pt-7 mb-6 relative after:block after:content-[attr(data-content)] after:bg-green-500 after:w-20 after:h-2 after:absolute after:top-19 after:w-36 after:rounded-2xl after:left-1/2 after:transform after:-translate-x-1/2 font-[Poppins]'>Contact Us</h1>
            <div data-aos='fade-right' className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2">
                    <div className='p-10'>
                        <h1 className='font-bold text-3xl tracking-wide mb-2'><ion-icon name="headset"></ion-icon> Get In Touch</h1>
                        <p className='text-green-200 text-sm md:pr-16 mb-6'>Connect with Agrobook's Contact Page for efficient communication and personalized assistance in all things agriculture-related. Reach out to Agrobook's Contact Page to get in touch with us and explore the world of modern agriculture solutions.</p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex flex-row space-x-3">
                                <ion-icon name="call"></ion-icon>
                                <span>+(91)953 751 9367</span>
                            </div>
                            <div className="flex flex-row space-x-3">
                                <ion-icon name="mail-open-outline"></ion-icon>
                                <span>agrobook@gmail.com</span>
                            </div>
                            <div className="flex flex-row space-x-3">
                                <ion-icon name="location-outline"></ion-icon>
                                <span>Vadodara, Gujarat - India</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 mx-auto mt-10 text-white font-[Poppins] font-normal">
                    <form onSubmit={handleSubmit}>
                        <div className='p-1'>Your Name</div>
                        <input type="text" placeholder='Enter Your Name:' name="from_name" className='p-2 w-full text-gray-500 bg-white rounded-md mb-2' />

                        <div className='p-1'>Email Address</div>
                        <input type="text" placeholder='Enter Your Email:' name="to_name" className='p-2 w-full text-gray-500 bg-white rounded-md mb-2' />

                        <div className='p-1'>Message</div>
                        <textarea placeholder="Type Your Message Here" name='message' cols="30" rows="6" className='rounded-md bg-white border text-gray-500 w-full mb-4' />

                        <button type="submit" className='p-2 bg-green-600 text-white rounded-md hover:bg-black hover:text-white w-full'>Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;



