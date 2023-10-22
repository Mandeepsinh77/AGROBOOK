import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import CarouselComponent from '../component/CarouselComp';
import AboutUs from '../component/About';
import Service from '../component/Service';
import Contact from '../component/Contact';
import Footer from '../component/Footer';
import ScrollToTop from '../component/ScrollToTop';
import { useContext } from 'react';
import { AppState } from '../App';
import {AiFillHome,AiFillInfoCircle} from 'react-icons/ai';
import {MdMiscellaneousServices,MdContactPage} from 'react-icons/md';

const HomePage = () => {
  const useAppState = useContext(AppState);
  const links = [
    { name: "Home", link: "/",icon:<AiFillHome/> },
    { name: "About", link: "/about",icon:<AiFillInfoCircle/> },
    { name: "Services", link: "/services",icon:<MdMiscellaneousServices/> },
    { name: "Contact Us", link: "/contact",icon:<MdContactPage/> },
    // { name: "Dashboard", link: "/dashboard" },
  ];

  const caption = [
    <div className="text-green-400 text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-4">
      Welcome To AgroBook!
    </div>,
    <div className="text-white text-lg md:text-xl lg:text-lg xl:text-xl 2xl:text-2xl">
      Step into the future of agriculture with Agrobook. We invite you to explore a realm of possibilities, where tradition meets innovation and expertise meets technology. Your journey to unparalleled agricultural success begins here.
    </div>
  ];


  const [showAbout, setshowAbout] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.querySelector('.bg-green-900');
      if (aboutSection && window.scrollY > aboutSection.offsetTop - window.innerHeight / 2) {
        setshowAbout(true);
      }

    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <>
      <Navbar links={links} />
      <div className='mt-14'>
        <CarouselComponent caption={caption} />
      </div>
      <div>
        <AboutUs show={showAbout} />
      </div>
      <Service />
      <Contact />
      <Footer/>
      <ScrollToTop/>
    </>

  )
}

export default HomePage