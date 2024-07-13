// OrderDetail.js
import { useLoaderData } from 'react-router-dom';
import { getOrderById } from '../api';
import { useEffect } from 'react';
import FontAwesome from "react-fontawesome";


export async function loader({ params }) {
  const { id } = params;
  try {
    const order = await getOrderById({ id });
    return order;
  } catch (error) {
    console.error('Error loading order:', error);
    throw error;
  }
}

const getStatusIcon = (status) => {
  switch (status) {
    case 'placed':
      return <FontAwesome  className="text-customGreen" name="fa-solid fa-check" />; // Replace with an actual icon
    case 'shipped':
      return <FontAwesome  className="text-customGreen" name="fa-light fa-truck fa-flip-horizontal fa-lg" />; // Replace with an actual icon
    case 'delivered':
      return <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 640 512"><path fill="#00b207" d="M640 0V400c0 61.9-50.1 112-112 112c-61 0-110.5-48.7-112-109.3L48.4 502.9c-17.1 4.6-34.6-5.4-39.3-22.5s5.4-34.6 22.5-39.3L352 353.8V64c0-35.3 28.7-64 64-64H640zM576 400a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM23.1 207.7c-4.6-17.1 5.6-34.6 22.6-39.2l46.4-12.4 20.7 77.3c2.3 8.5 11.1 13.6 19.6 11.3l30.9-8.3c8.5-2.3 13.6-11.1 11.3-19.6l-20.7-77.3 46.4-12.4c17.1-4.6 34.6 5.6 39.2 22.6l41.4 154.5c4.6 17.1-5.6 34.6-22.6 39.2L103.7 384.9c-17.1 4.6-34.6-5.6-39.2-22.6L23.1 207.7z"/></svg>; 
    case 'cancelled':
      return '❌'; // Replace with an actual icon
    default:
      return '⚪'; // Default icon
  }
};

const getProgressBarWidth = (status) => {
  switch (status) {
    case 'placed':
      return '33%';
    case 'shipped':
      return '66%';
    case 'delivered':
      return '100%';
    default:
      return '0%';
  }
};

export default function OrderDetail() {
  const orderDetail = useLoaderData();
  const statusIcon = getStatusIcon(orderDetail.status);
  const progressBarWidth = getProgressBarWidth(orderDetail.status);

  useEffect(() => {
    console.log(orderDetail);
  }, [orderDetail]);

  return (
    <div className="container mx-auto px-4  py-8 bg-gradient-to-r from-slate-50 to-slate-200 ">
      <h1 className="text-2xl  font-bold mb-4">Order Details</h1>
      <div className="bg-gradient-to-r border border-gray-400 shadow-md from-green-100 to-green-200 rounded-lg p-4 mb-4">
        <div className="flex items-center   mb-4">
          <div>
            <p className="text-lg font-medium">Order ID: {orderDetail._id}</p>
            <p className="text-lg font-medium">Status: {orderDetail.status} {statusIcon}</p>
          </div>
        </div>
        <div className="relative w-full h-4 bg-gradient-to-r from-slate-300 to-slate-500 rounded-full">
          <div
            className="absolute top-0 left-0 h-4 bg-gradient-to-r from-orange-500 to-orange-800 rounded-full"
            style={{ width: progressBarWidth }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 ">
          <div className="text-center">
            <span className="block text-sm">Placed</span>
            <span className="block">{getStatusIcon('placed')}</span>
          </div>
          <div className="text-center">
            <span className="block text-sm">Shipped</span>
            <span className="block">{getStatusIcon('shipped')}</span>
          </div>
          <div className="text-center">
            <span className="block text-sm">Delivered</span>
            <span className="block">{getStatusIcon('delivered')}</span>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2 ">Order Items</h2>
        {orderDetail.items.map((item) => (
          <div key={item._id} className="border border-gray-400 shadow-md py-2 bg-gradient-to-r  from-green-100 to-green-200 rounded p-4">
            {item.product && (
              <>
                <p className='text-xl p-2'>Name: {item.product.name}</p>
                <p className='text-xl p-2'>Price: {item.product.price}</p>
              </>
            )}
            {item.book && (
              <>
                <p>Name: {item.book.name}</p>
                <p>Price: {item.book.price}</p>
              </>
            )}
            {item.course && (
              <>
                <p>Name: {item.course.name}</p>
                <p>Price: {item.course.price}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
