import { useLoaderData, defer, Link } from 'react-router-dom';
import { getOrders, cancelOrder } from '../api';
import { useState, useEffect } from 'react';

export async function loader() {
  const allOrders = await getOrders();
  return defer({ allOrders });
}

function OrderHistory() {
  const { allOrders: initialOrders } = useLoaderData();
  console.log(initialOrders)
  const [orders, setOrders] = useState(initialOrders);
  const [cancelingOrderId, setCancelingOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setOrders(initialOrders); // Update orders state when initialOrders change
  }, [initialOrders]);

  const handleCancelOrder = async (orderId) => {
    setCancelingOrderId(orderId);
  };

  const handleConfirmCancel = async () => {
    try {
      const response = await cancelOrder({ cancelingOrderId, cancelReason });
      setMessage(response.message);

      // Remove canceled order from UI by filtering it out from orders
      setOrders(prevOrders => prevOrders.filter(order => order._id !== cancelingOrderId));

      // Reset message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error('Failed to cancel order:', error);
      setMessage('Failed to cancel order. Please try again.');
    } finally {
      // Reset state after cancellation attempt
      setCancelingOrderId(null);
      setCancelReason('');
    }
  };

  return (
    <div className="p-10 pb-14 px-4 md:px-6 2xl:px-20 bg-gradient-to-r from-slate-50 to-slate-200 2xl:container 2xl:mx-auto">
      <div className="flex justify-center items-center  space-y-2 flex-col">
        <h1 className="text-3xl text-center dark:text-black lg:text-3xl font-semibold leading-7 lg:leading-9 text-gray-800">Order History</h1>
      </div>
      <div className="mt-6 flex flex-col justify-center items-stretch w-full space-y-4 md:space-y-6">
        {message && (
          <div className={`text-center py-2 ${message.toLowerCase().includes('cancelled') ? 'text-green-600' : 'text-red-800'}`}>
            {message.replace(/"/g, '')}
          </div>
        )}
        
        
        



        
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#707070] divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Order #{order._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {
                      order.items[0].product ? order.items[0].product.name :
                      order.items[0].book ? order.items[0].book.name :
                      order.items[0].course ? order.items[0].course.name : "Item"
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    EGP {" "}{
                      order.items[0].product ? order.paymentPrice :
                      order.items[0].book ? order.paymentPrice :
                      order.items[0].course ? order.paymentPrice : "N/A"
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`${order._id}`} className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-md shadow-md mr-2">
                      Track Order
                    </Link>
                    {cancelingOrderId === order._id ? (
                      <div className="flex items-center">
                        <textarea
                          className="resize-none border border-gray-300 rounded-md py-1 px-3 mr-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                          placeholder="Reason for cancellation..."
                          value={cancelReason}
                          onChange={(e) => setCancelReason(e.target.value)}
                        />
                        <button
                          onClick={handleConfirmCancel}
                          className="bg-red-700 hover:bg-red-800 text-white py-1 px-3 rounded-md shadow-md"
                        >
                          Confirm
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="bg-red-700 hover:bg-red-800 text-white py-1 px-3 rounded-md shadow-md"
                      >
                        Cancel Order
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
