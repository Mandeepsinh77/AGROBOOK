import React, { useState } from 'react';
import imgChange from "../images/changePsw.png"
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../images/Agro.png";
import swal from 'sweetalert';
import { useData } from '../useContext/DataContext';


function PasswordChange() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const { password } = useData();

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onClose = () => {
    setNewPassword('');
    setConfirmPassword('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your password change logic here
    if (newPassword === confirmPassword) {
      // Passwords match, perform the change
      swal({
        title: "Change Password Successfully",
        icon: "success",
        button: false,
        timer: 3000
      })
      setNewPassword('')
      setConfirmPassword('');

    } else {
      // Passwords don't match, display an error message or handle accordingly
      swal({
        title: "Password doesn't Matched",
        icon: "error",
        button: false,
        timer: 3000
      })
    }
  };

  return (
    <>
      <div className=' bg-cover bg-no-repeat bg-center relative h-screen'>
        <div className="flex flex-row justify-between items-center mx-2">
          <div className="flex items-center">
            <img src={Logo} alt="" style={{ height: "50px", width: "60px" }} className='mix-blend-multiply' />
            <Link to="/"><h1 className="ml-2 text-3xl text-black font-bold font-[Arimo]">AgroBook</h1></Link>
          </div>
          <button onClick={() => navigate('/dashboard')} className="relative ml-auto text-center px-4 border-2 border-green-800 p-2 sm:rounded-sm lg:rounded-full md:rounded-md hover:bg-green-800 hover:text-white hover:shadow-lg hover:duration-500"><ion-icon name="arrow-undo"></ion-icon> Back to your account</button>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-lg sm:w-full md:w-96 lg:w-96 xl:w-96 mx-auto mt-4 drop-shadow-2xl">
          <img src={imgChange} alt="" className='mx-auto w-1/2 h-1/2' />
          <h2 className="font-bold font-[Poppins] text-3xl text-center tracking-wide">Change Password</h2>
          <p className='text-xs font-[Poppins] text-center'>You can now change your password</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="oldPassword" className="block text-black font-bold font-[Poppins] mb-1" >Old Password:</label>
              <input
                type="text"
                id="oldPassword"
                value={password}
                required
                placeholder='Enter old Password'
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 drop-shadow-lg"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-black font-bold font-[Poppins] mb-1">New Password:</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
                placeholder='Enter New Password'
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 drop-shadow-lg"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-black font-bold font-[Poppins] mb-1">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                placeholder='Enter Confirm Password'
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 drop-shadow-lg"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto bg-green-800 text-white py-2 px-4 rounded-lg mt-2 sm:mt-0 hover:bg-green-700 drop-shadow-lg focus:outline-none focus:ring focus:border-blue-300"
              >
                Change Password
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto bg-black text-white py-2 px-4 rounded-lg mt-2 sm:mt-0 hover:bg-white hover:text-black drop-shadow-lg focus:outline-none focus:ring focus:border-gray-300"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PasswordChange;