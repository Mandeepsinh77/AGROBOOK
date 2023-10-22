import React, { useState } from 'react';
import Agro from '../images/Agro.mp4';
import { TailSpin } from "react-loader-spinner"
import { Link } from "react-router-dom"
import swal from "sweetalert"
import { useNavigate } from 'react-router-dom';


const SignupPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(
    {
      shopname: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  );

  async function storeUser() {
    const url = "http://localhost:4000/auth/createuser";
    setLoading(true)

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    const shopname = data['user'].shopname;
    console.log(shopname)

    // console.log(data["message"])
    // console.log(res.ok)

    if (res.ok) {
      swal({
        title: "Successfully SignUp",
        icon: "success",
        button: false,
        timer: 3000
      })

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      navigate("/login")

    } else {
      swal({
        title: data["message"],
        icon: "error",
        button: false,
        timer: 3000
      })
    }
    setLoading(false)

  }


  const handleSubmit = (e) => {
    try {
      e.preventDefault()
      const password = formData.password;
      const conformPassword = formData.confirmPassword;

      if (password !== conformPassword) {
        swal({
          title: "Password Not Match",
          icon: "error",
          button: false,
          timer: 3000
        })
      }
      else {
        storeUser();
      }
    } catch (err) {
      window.alert(err)
    }
  };

  return (
    <div className="min-h-screen flex items-center  justify-center">
      <video
        className="absolute top-0 left-0 object-cover w-full h-full opacity-80 z-0"
        loop
        autoPlay
        muted
      >
        <source
          src={Agro}
          type="video/mp4"
        />
      </video>

      <div className="w-full opacity-80 max-w-lg p-8 bg-white rounded-lg shadow-lg z-10">
        <h2 className="text-2xl text-center font-semibold mb-6"><span className='text-green-600 no-underline hover:underline hover:cursor-pointer'>Grow With Us,</span> Sign Up Today!</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            id="shopname"
            name="shopname"
            value={formData.shopname}
            onChange={(e) => setFormData({ ...formData, shopname: e.target.value })}
            className="block w-full px-4 py-3 mb-4 border rounded-lg placeholder-gray-600 bg-slate-200 text-gray-800"
            placeholder="Enter Your Shop Name"
            required
          />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="block w-full px-4 py-3 mb-4 border rounded-lg placeholder-gray-600 bg-slate-200 text-gray-800"
            placeholder="Enter Your Name"
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="block w-full px-4 py-3 mb-4 border rounded-lg placeholder-gray-600 bg-slate-200 text-gray-800"
            placeholder="Enter Your Email"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="block w-full px-4 py-3 mb-4 border rounded-lg placeholder-gray-600 bg-slate-200 text-gray-800"
            placeholder="Enter Password"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="block w-full px-4 py-3 mb-6 border rounded-lg placeholder-gray-600 bg-slate-200 text-gray-800"
            placeholder="Conform Password"
            required
          />
          <div className="p-2 w-full ">
            <button className="w-full  place-items-center py-3 bg-green-500 rounded-lg text-white hover:bg-green-600  transition  duration-300 border-0"><span className='text-lg '></span>
              {loading ?
                <div className='flex items-center justify-center '>
                  <TailSpin height={25} color='white' />
                </div>
                : "SignUp"}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center p-2  text-gray-700 text-sm">
          Already Have an Account?
          <Link to="/login" className="ml-1 text-green-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

