import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DroneTracker from '../components/DroneTracker';
import '../styles/OrderDetail.css';

const OrderDetail = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      const data = await response.json();
      setOrderDetails(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  if (loading) return <div>加载中...</div>;

  return (
    <div className="order-detail">
      <h2>订单详情</h2>
      <div className="order-info">
        <div className="order-header">
          <h3>订单号: {orderDetails.orderId}</h3>
          <span className={`status ${orderDetails.status}`}>
            {orderDetails.status}
          </span>
        </div>

        <div className="delivery-info">
          <h4>配送信息</h4>
          <p>配送方式: {orderDetails.deliveryMethod === 'drone' ? '无人机配送' : '普通配送'}</p>
          <p>收货地址: {orderDetails.deliveryAddress.street}</p>
          <p>联系电话: {orderDetails.phoneNumber}</p>
        </div>

        <div className="items-list">
          <h4>订单商品</h4>
          {orderDetails.items.map(item => (
            <div key={item._id} className="order-item">
              <img src={item.medicine.image} alt={item.medicine.name} />
              <div className="item-info">
                <h5>{item.medicine.name}</h5>
                <p>数量: {item.quantity}</p>
                <p>单价: ¥{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <p>商品总额: ¥{orderDetails.totalAmount}</p>
          <p>配送费用: ¥{orderDetails.deliveryFee}</p>
          <h4>实付金额: ¥{orderDetails.totalAmount + orderDetails.deliveryFee}</h4>
        </div>
      </div>

      {orderDetails.deliveryMethod === 'drone' && (
        <DroneTracker orderId={orderId} />
      )}
    </div>
  );
};

export default OrderDetail; 