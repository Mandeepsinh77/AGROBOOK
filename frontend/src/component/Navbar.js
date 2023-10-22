import { React, useState } from 'react';
import { useContext } from 'react';
import Logo from '../images/Agro.png';
import { Link } from 'react-router-dom';
import { AppState } from '../App';
import { useData } from '../useContext/DataContext';
import {BsShop} from 'react-icons/bs'

const Navbar = ({ links, setAddCustomer, setContact, setitemList, setAddItem, setcategoryList, setcustomerList,setSell,setPayment  }) => {

  const [open, setOpen] = useState(false);

  const { data , shopname} = useData();

  const useAppState = useContext(AppState);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // const [customer,setCustomer]=new useState(false);
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  return (
    <>
      <div className="shadow-md fixed top-0 left-0 right-0 p-2 bg-[#6AB187]" style={{ zIndex: 100 }}>
        <div className="container mx-auto md:flex md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={Logo} alt="" style={{ height: "60px", width: "73px", borderRadius: "50%" }} />
              <Link to="/"> <h1 className="my-auto text-2xl text-white"> &nbsp; AgroBook</h1></Link>
            </div>
            <button className="md:hidden text-green-800 focus:outline-none " onClick={toggleMobileMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          <ul className={`md:flex md:flex-row md:space-x-4 ${showMobileMenu ? 'block mt-2 md:mt-0 ' : 'hidden md:block md:mt-0'} `}>
            {!useAppState.login ?
              links.map((link,index) => (
                <li key={link.name} className="text-xl text-white">
                  <Link to={link.link} key={index} className={`hover:text-white p-2 ${showMobileMenu ? 'block  mt-4' : ''} hover:bg-[#1F3F49] hover:rounded-t-2xl hover:rounded-t-2xl hover:text-white duration-200 flex items-center`}>
                    {link.icon} &nbsp; 
                    {link.name}
                  </Link>
                </li>
              ))
              :
              <li className="text-xl">
                <Link to="/dashboard" className={`hover:text-green-800 p-2 ${showMobileMenu ? 'block  mt-4' : ''} hover:bg-[#1F3F49] hover:rounded-t-2xl hover:rounded-t-2xl hover:text-white duration-200`}>
                  <span>Welcome {shopname} </span>
                  <BsShop className='ml-2 inline'/>
                </Link>
              </li>
            }
          </ul>


          {!useAppState.login ?
            <div className={`md:block ${showMobileMenu ? 'block mt-2 md:mt-0' : 'hidden md:block md:mt-0'}`}>
              <Link to="/signup">
                <button className="bg-[#1F3F49] text-white px-5 py-2 rounded-full hover:bg-white hover:text-green-800 hover:border-2 duration-200 mx-2 drop-shadow-xl">
                  Sign In
                </button>
              </Link>
              <Link to="/login">
                <button className="bg-[#1F3F49] text-white px-5 py-2 rounded-full hover:bg-white hover:text-green-800 hover:border-2 duration-200 drop-shadow-xl">
                  Log In
                </button>
              </Link>
            </div>
            :
            <div className={`md:block ${showMobileMenu ? 'block mt-2 md:mt-0' : 'hidden md:block md:mt-0'}`}>
              <Link to="/">
                <button onClick={() => {
                  setAddItem(false)
                  setContact(false)
                  setitemList(false)
                  setcategoryList(false)
                  setcustomerList(false)
                  setSell(false)
                  setPayment(false)
                  setAddCustomer(true)
                }} className="bg-[#1F3F49] drop-shadow-xl text-white px-5 py-2 rounded-full hover:bg-white hover:text-green-800 hover:border-2 duration-200 mx-2 ">
                  Customer +
                </button>
              </Link>
              <Link to="/">
                <button onClick={() => {
                  setContact(false)
                  setitemList(false)
                  setAddCustomer(false)
                  setcategoryList(false)
                  setcustomerList(false)
                  setSell(false)
                  setPayment(false)
                  setAddItem(true)
                }} className="bg-[#1F3F49] drop-shadow-xl w-[120px] text-white px-5 py-2 rounded-full hover:bg-white hover:text-green-800 hover:border-2 duration-200 mx-2 ">
                  Item +
                </button>
              </Link>
              <Link>
                <div className='bg-[#1F3F49] w-[50px] rounded-full ml-[320px] mt-[-43px] p-2 drop-shadow-xl hover:bg-white hover:text-black hover:border-2'>
                  <p className='text-2xl hover:text-black text-white pl-2' onClick={() => setOpen(!open)}>{data.charAt(0).toUpperCase()}</p>
                </div>
              </Link>
            </div>
          }

        </div>

      </div>

      {open && (
        <div className='bg-[#1F3F49] w-full md:w-1/2 lg:w-1/6 p-2 mx-auto mt-5 md:mt-20 lg:mt-20 lg:mr-24 rounded-lg block absolute right-10 z-50'>
          <ul className='p-2'>
            <li className='px-2 py-2 text-white text-md hover:bg-white hover:text-blue-950 cursor-pointer rounded-lg'><Link>Profile</Link></li>
            <li className='px-2 py-2 text-white text-md hover:bg-white hover:text-blue-950 cursor-pointer rounded-lg'><Link to="/changePsw">Change Password</Link></li>
            <li className='px-2 py-2 text-white text-md hover:bg-white hover:text-blue-950 cursor-pointer rounded-lg'><Link to="/login">Log Out</Link></li>
          </ul>
        </div>
      )}

    </>
  )
}

export default Navbar
