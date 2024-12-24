import React, { useState, useEffect } from 'react';
import { Map, Marker } from 'react-bmapgl';
import '../styles/DroneTracker.css';

const DroneTracker = ({ orderId }) => {
  const [deliveryStatus, setDeliveryStatus] = useState({
    status: 'preparing',
    location: {
      latitude: 39.915,  // 默认位置
      longitude: 116.404
    },
    estimatedTime: null,
    droneId: null
  });

  useEffect(() => {
    // WebSocket连接
    const ws = new WebSocket(`ws://your-backend-url/tracking/${orderId}`);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setDeliveryStatus(data);
    };

    return () => ws.close();
  }, [orderId]);

  const getStatusText = (status) => {
    const statusMap = {
      'preparing': '订单准备中',
      'droneAssigned': '无人机已分配',
      'pickingUp': '正在取件',
      'delivering': '配送中',
      'delivered': '已送达',
      'returned': '已返回'
    };
    return statusMap[status] || status;
  };

  const calculateProgress = (status) => {
    const stages = ['preparing', 'droneAssigned', 'pickingUp', 'delivering', 'delivered'];
    const currentIndex = stages.indexOf(status);
    return ((currentIndex + 1) / stages.length) * 100;
  };

  return (
    <div className="drone-tracker">
      <h3>配送追踪</h3>
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ width: `${calculateProgress(deliveryStatus.status)}%` }}
        />
      </div>
      
      <div className="status-info">
        <p className="status">状态: {getStatusText(deliveryStatus.status)}</p>
        {deliveryStatus.estimatedTime && (
          <p className="eta">预计送达时间: {new Date(deliveryStatus.estimatedTime).toLocaleTimeString()}</p>
        )}
        {deliveryStatus.droneId && (
          <p className="drone-id">无人机编号: {deliveryStatus.droneId}</p>
        )}
      </div>

      <div className="location-map">
        <Map
          center={{ lng: deliveryStatus.location.longitude, lat: deliveryStatus.location.latitude }}
          zoom={15}
          enableScrollWheelZoom
        >
          <Marker
            position={{ lng: deliveryStatus.location.longitude, lat: deliveryStatus.location.latitude }}
            icon="drone-icon.png"
            animation={window.BMAP_ANIMATION_BOUNCE}
          />
        </Map>
      </div>
    </div>
  );
};

export default DroneTracker; 