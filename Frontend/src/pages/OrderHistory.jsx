import { getOrders } from '../api';
import { useLoaderData , defer } from 'react-router-dom';

export async function loader() {
    const orders = await getOrders();
    console.log(orders)
    return defer({ orders });
  }
  
function OrderHistory() {
    const orders = useLoaderData()
  return (
    <div>
      <h2>Order History</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <div>Order ID: {order._id}</div>
            <div>Address: {order.address}</div>
            <div>Phone: {order.phone}</div>
            <div>Notes: {order.notes}</div>
            <div>Price: {order.price}</div>
            <div>Payment Method: {order.paymentMethod}</div>
            <div>Status: {order.status}</div>
            <div>Created At: {new Date(order.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default OrderHistory