import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
   offset: 200,
   duration: 800,
   easing: 'ease-in-out',
   once: true,
 });

const AboutUs = ({ show }) => {
  return (
    /*about us comment */
    <div data-aos="flip-left"
    data-aos-easing="ease-out-cubic"
    data-aos-duration="2000" className="relative bg-green-900 text-white p-6 md:p-10 lg:p-16 mt-6 transform transition-transform ease-out duration-1000">
      <div className="absolute inset-0 bg-[#6AB187] opacity-50 z-[-1]"></div>
      <div className={`relative ${show ? 'opacity-100 animate-slide-in-up' : 'opacity-0'} mx-auto max-w-3xl md:max-w-4xl lg:max-w-5xl`}>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
          At Agrobook, our roots run deep in the fields of agriculture. With a passion for innovation and a commitment to progress, we've created a platform that brings together a community of farmers, experts, and enthusiasts who share a common goal: to revolutionize modern farming.
        </p>
        <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl mt-4">
          Our mission is to empower every individual in the agricultural ecosystem. We provide a digital space where you can access the latest advancements in farming techniques, harness the power of data-driven insights, and connect with like-minded individuals to learn and grow together.
        </p>
        <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl mt-4">
          From optimizing crop yields through precision agriculture to exploring sustainable practices that protect the land and resources, Agrobook offers a comprehensive toolkit for success. Our platform is designed to bridge the gap between tradition and technology, enabling you to navigate challenges and seize opportunities in today's dynamic agricultural landscape.
        </p>
        <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl mt-4">
          Join us on this transformative journey. Together, we're cultivating a future where innovation meets tradition, and where every seed sown is nurtured into a thriving harvest. Welcome to Agrobook - your partner in agricultural excellence.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;




