import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AppState } from "../App.js";
import { useLocation } from 'react-router-dom';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import Tooltip from "@mui/material/Tooltip";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const useAppState = useContext(AppState);
  const shopkeeperid = useAppState.UserId
  var today = new Date();

  const searchParams = new URLSearchParams(location.search);
  const customerName = searchParams.get('customerName');
  const totalCost = searchParams.get('totalCost');
  const customerPhone = searchParams.get('customerPhone');


  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [amountpaid, setAmountpaid] = useState();
  const [remaining_amount, setRemaining_amount] = useState(0)

  const [previousRemaining, setPreviousRemaining] = useState(0);

  const [temp, setTemp] = useState(0)


  const [chequeDetails, setChequeDetails] = useState({
    chequeNo: '',
    chequeAmount: '',
    accountHolderName: '',
    bankName: '',
  });

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardBankName: '',
    cardHolderName: '',
  });

  const [upiDetails, setUpiDetails] = useState({
    upiID: '',
  });

  const [cashDetails, setCashDetails] = useState({
    cash_amount: '',
  })


  const handleAmountPaidChange = (e) => {
    setAmountpaid(e.target.value);
  };
  
  const handleAmountPaidKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Enter key is pressed, calculate the new Remaining Amount
      if (e.target.value > remaining_amount) {
        window.alert("not requiere that much amount")
        return;
      }
      const paidAmount = parseFloat(e.target.value) || 0;
      const remAmount = parseFloat(remaining_amount) || 0;
      console.log(temp);
      const temp2 = parseFloat(temp);
      const newRemaining = temp2 - paidAmount;
      setRemaining_amount(newRemaining.toFixed(2));
    }
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleConfirmPayment = () => {
    if (paymentMethod === 'Cheque') {
      // Create a JSON payload from the chequeDetails
      const paymentData = {
        shopkeeperid,
        today,
        totalCost,
        customerName,
        customerPhone,
        amountpaid,
        remaining_amount,
        paymentMethod,
        chequeDetails, // This includes all the chequeDetails data
      };

      const url = "http://localhost:4000/payment/confirm_cheque_payment";
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error saving Cheque payment details');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Cheque payment details saved:', data);
          // Handle success as needed (e.g., show a success message)
        })
        .catch((error) => {
          console.error('Error saving Cheque payment details:', error);
          // Handle errors as needed (e.g., show an error message)
        });
    }
    else if (paymentMethod === 'Card') {
      const paymentData = {
        shopkeeperid,
        today,
        totalCost,
        customerName,
        customerPhone,
        amountpaid,
        remaining_amount,
        paymentMethod,
        cardDetails, // This includes all the chequeDetails data
      };


      const url = "http://localhost:4000/payment/confirm_card_payment";
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error saving Card payment details');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Card payment details saved:', data);
          // Handle success as needed (e.g., show a success message)
        })
        .catch((error) => {
          console.error('Error saving Card payment details:', error);
          // Handle errors as needed (e.g., show an error message)
        });
    }
    else if (paymentMethod === 'UPI') {
      const paymentData = {
        shopkeeperid,
        today,
        totalCost,
        customerName,
        customerPhone,
        amountpaid,
        remaining_amount,
        paymentMethod,
        upiDetails, // This includes all the chequeDetails data
      };



      const url = "http://localhost:4000/payment/confirm_upi_payment";
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error saving UPI payment details');
          }
          return response.json();
        })
        .then((data) => {
          console.log('UPI payment details saved:', data);
          // Handle success as needed (e.g., show a success message)
        })
        .catch((error) => {
          console.error('Error saving UPI payment details:', error);
          // Handle errors as needed (e.g., show an error message)
        });
    }
    else {
      const paymentData = {
        shopkeeperid,
        today,
        totalCost,
        customerName,
        customerPhone,
        amountpaid,
        remaining_amount,
        paymentMethod,
        cashDetails
      };


      const url = "http://localhost:4000/payment/confirm_cash_payment";
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error saving Cheque payment details');
          }
          return response.json();
        })
        .then((data) => {
          swal({
            title: "Payment done",
            icon: "success",
            button: false,
            timer: 3000
          })
          setCashDetails([])
          setCashDetails({ ...cashDetails, cash_amount: 0 })
          console.log('Cash details saved:', data);
          // Handle success as needed (e.g., show a success message)
        })
        .catch((error) => {
          console.error('Error saving Cash payment details:', error);
          // Handle errors as needed (e.g., show an error message)
        });
    }

    setAmountpaid(0)
    fetchingRemainingAmount();
    // navigate("/payment")

  };

  const fetchingRemainingAmount = async () => {
    const customerPhone = searchParams.get('customerPhone');
console.log("enter")
     const requestData = {
       customerPhone: customerPhone,
       shopkeeperid: shopkeeperid
     }
    try {
      // Fetch and set the previous remaining amount when the component loads
      const url = "http://localhost:4000/payment/fetch_remaining_amount";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const cost = parseFloat(totalCost);
        setRemaining_amount(cost);
        setTemp(cost)
        throw new Error('Error fetching previous remaining amount');
      }

      const data = await response.json();
      console.log('fetch_remaining_amount:', data);
      // return data.previousRemainingAmount;

     
      const cost = parseFloat(totalCost);
      const paidAmount = parseFloat(amountpaid);
      const preRemainCost = parseFloat(data.previousRemainingAmount);
      
      const newRemaining = cost + preRemainCost;
      console.log("newRamining amount")
      console.log(newRemaining)
      setRemaining_amount(newRemaining);
      console.log("setReminaingProps")
      console.log(remaining_amount)
      setTemp(newRemaining)
      console.log("setTempProps")
      console.log(temp)
      setPreviousRemaining(data.previousRemainingAmount);
      console.log("preRemainning from database")
      console.log(previousRemaining)

    } catch (error) {
      console.error('Error fetching previous remaining amount:', error);
    }
  };





  useEffect(() => {

    fetchingRemainingAmount();

  }, []);




  return (
    <div className="mx-auto max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>

      <p className="mb-4">Total Cost: {totalCost}</p>
      <p className="mb-4">Customer Name: {customerName}</p>
      <p className="mb-4">Customer Phone: {customerPhone}</p>

      <div className="mb-4">
        <label className="block mb-2">Amount Paid:</label>
        <input
          type="text"
          value={amountpaid}
          onChange={handleAmountPaidChange}
          onKeyPress={handleAmountPaidKeyPress}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Remaining Amount:</label>
        <input
          type="text"
          value={remaining_amount}
          readOnly
          className="w-full p-2 border rounded bg-gray-200"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
          className="w-full p-2 border rounded"
        >
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Cheque">Cheque</option>
          <option value="UPI">UPI</option>
        </select>
      </div>

      {paymentMethod === 'Cheque' && (
        <div>
          <div className="mb-4">
            <label className="block mb-2">Cheque No:</label>
            <input
              type="text"
              value={chequeDetails.chequeNo}
              onChange={(e) => setChequeDetails({ ...chequeDetails, chequeNo: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Cheque Amount:</label>
            <input
              type="text"
              value={chequeDetails.chequeAmount}
              onChange={(e) => setChequeDetails({ ...chequeDetails, chequeAmount: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Account Holder Name:</label>
            <input
              type="text"
              value={chequeDetails.accountHolderName}
              onChange={(e) => setChequeDetails({ ...chequeDetails, accountHolderName: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Bank Name:</label>
            <input
              type="text"
              value={chequeDetails.bankName}
              onChange={(e) => setChequeDetails({ ...chequeDetails, bankName: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      )}


      {paymentMethod === 'Card' && (
        <div>
          <div className="mb-4">
            <label className="block mb-2">Card Number:</label>
            <input
              type="text"
              value={cardDetails.cardNumber}
              onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Bank Name:</label>
            <input
              type="text"
              value={cardDetails.cardBankName}
              onChange={(e) => setCardDetails({ ...cardDetails, cardBankName: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Card Holder Name:</label>
            <input
              type="text"
              value={cardDetails.cardHolderName}
              onChange={(e) => setCardDetails({ ...cardDetails, cardHolderName: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      )}


      {paymentMethod === 'UPI' && (
        <div>
          <div className="mb-4">
            <label className="block mb-2">UPI ID:</label>
            <input
              type="text"
              value={upiDetails.upiID}
              onChange={(e) => setUpiDetails({ ...upiDetails, upiID: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      )}

      {paymentMethod === 'Cash' && (
        <div>
          <div className="mb-4">
            <label className="block mb-2">Cash Amount :</label>
            <input
              type="text"
              value={cashDetails.cash_amount}
              onChange={(e) => setCashDetails({ ...cashDetails, cash_amount: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      )}
      <Tooltip title='Final Step'>
      <button
        onClick={handleConfirmPayment}
        className="bg-green-500 hover.bg-green-600 text-white font-semibold py-2 px-4 rounded"
      >
        Confirm Payment
      </button>
      </Tooltip>
    </div>
  );
}

export default Payment;