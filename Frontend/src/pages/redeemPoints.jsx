import React, { useState } from 'react';
import { defer, Await, useLoaderData } from 'react-router-dom';
import Confetti from 'react-confetti';
import { getUserData, redeem } from '../api';

export async function loader() {
  const userInfo = await getUserData();
  return defer({ userInfo });
}

function RedeemPoints() {
  const { userInfo } = useLoaderData();
  const [userPoints, setUserPoints] = useState(userInfo.user.points);
  const [message, setMessage] = useState('');
  const [coupon, setCoupon] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleRedeem = async () => {
    try {
      const response = await redeem();
      setMessage(response.message);
      setCoupon(response.coupon);
      setUserPoints(0);
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to redeem points:', error);
      setMessage('Failed to redeem points. Please try again.');
    }
  };

  return (
    <React.Suspense fallback={<h2>Loading Your points...</h2>}>
      <div className="container text-center mx-auto m-10  px-5 pt-5 h-[400px] max-w-lg bg-[#d1d0d0] shadow-lg rounded-lg">
        <h1 className="text-5xl  font-bold text-gray-800 mb-4">Your Points</h1>
        <p className="text-3xl text-gray-700">{userPoints} Point</p> 
        <button
          onClick={handleRedeem}
          className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition-colors"
        >
          Redeem Points
        </button>
        {message && <p className="mt-4 text-lg text-green-600">{message}</p>}
        {coupon && (
          <div className=" p-4 bg-yellow-200 rounded-md">
            <h2 className="text-xl font-bold text-gray-800">Your Coupon</h2>
            <p className="text-lg text-gray-700">Code: {coupon.code}</p>
            <p className="text-lg text-gray-700">Amount: {coupon.amount}%</p>
            <p className="text-lg text-gray-700">Number of Uses: {coupon.numofUses}</p>
          </div>
        )}
        {showConfetti && <Confetti />}
      </div>
    </React.Suspense>
  );
}

export default RedeemPoints;
