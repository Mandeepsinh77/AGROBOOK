
import './App.css';
// import Navbar from './component/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import SignupPage from './component/SignupPage.js';
import Login from './component/Login.js';
import Dashboard from './Pages/Dashboard.js';
import Service from './component/Service';
import Contact from './component/Contact';
import FormInput from './Admin/FormInput';
import { createContext, useState } from 'react';
import CustomerEditInput from "./component/CustomerEditInput.js"
import ChangePsw from './Admin/ChangePsw';
import AddCustomer from './Admin/FormInput'
import Itemtable from './component/Itemtable';
import CategoryList from "./Pages/CategoryList";
import CustomerList from "./Pages/CustomerList";
import ForgotPsw from './Admin/ForgotPsw';
import ResetPsw from './Admin/ResetPsw';
import ItemList from './Pages/ItemList';
import Footer from './component/Footer';
import ScrollToTop from './component/ScrollToTop';
import Sell from './Pages/Sell'
import Analysis from './Pages/Analysis';
import Payment from "./Pages/Payment.js";
const AppState = createContext();


function App() {
  const [login, setLogin] = useState(false);

  return (

    // <BrowserRouter>
    <AppState.Provider value={{ login, setLogin }}>
      <div className='app'>
        <Routes>
          {
            login ?
              <Route path="/" element={<Dashboard />} />
              :
              <Route path="/" element={<HomePage />} />
          }

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/itemtable" element={<Itemtable />} />
          <Route path="/services" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/FormInput" element={<FormInput />} />
          <Route path="/changePsw" element={<ChangePsw />} />
          <Route path="/itemtable" element={<Itemtable />} />
          <Route path="/addCustomer" element={<AddCustomer />} />
          <Route path="/CustomerEditInput" element={<CustomerEditInput />} />
          <Route path="/newcategory" element={<CategoryList />} />
          <Route path="/CustomerList" element={<CustomerList />} />
          <Route path="/forgot" element={<ForgotPsw />} />
          <Route path="/forgotpassword/:id/:token" element={<ResetPsw />} />
          <Route path="/itemList" element={<ItemList />} />
          <Route path='/footer' element={<Footer/>}/>
          <Route path='/scrollToTop' element={<ScrollToTop/>}/>
          <Route path="/sell" element={<Sell />} />
          <Route path="/analysis" element={<Analysis/>}/>
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </AppState.Provider>
    // </BrowserRouter>

  );
}

export default App;
export { AppState }

