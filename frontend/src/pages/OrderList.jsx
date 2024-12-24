import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/OrderList.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/orders?status=${filter}`);
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="order-list">
      <h2>我的订单</h2>
      
      <div className="order-filters">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">全部订单</option>
          <option value="preparing">准备中</option>
          <option value="delivering">配送中</option>
          <option value="delivered">已送达</option>
          <option value="cancelled">已取消</option>
        </select>
      </div>

      {loading ? (
        <p>加载中...</p>
      ) : (
        <div className="orders-grid">
          {orders.map(order => (
            <Link to={`/orders/${order._id}`} key={order._id} className="order-card">
              <div className="order-card-header">
                <span>订单号: {order.orderId}</span>
                <span className={`status ${order.status}`}>{order.status}</span>
              </div>
              
              <div className="order-items-preview">
                {order.items.map(item => (
                  <div key={item._id} className="item-preview">
                    <img src={item.medicine.image} alt={item.medicine.name} />
                    <span>{item.medicine.name} x{item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="order-card-footer">
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                <span>¥{order.totalAmount}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList; 