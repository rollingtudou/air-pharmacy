import React, { useEffect, useState } from 'react';
import { Map, Marker, Polyline } from 'react-bmapgl';
import { Card, Progress, Typography, Tag, Space } from 'antd';
import { socket } from '../services/socket';
import { DroneStatus } from '../types';

const { Title, Text } = Typography;

interface EmergencyOrderTrackerProps {
  orderId: string;
  initialDroneStatus?: DroneStatus;
}

/**
 * 紧急订单追踪组件
 * 
 * 需要配置的接口：
 * 1. 订单状态更新WebSocket
 *    - 参考 backend/services/socket.ts
 *    - 需实现实时状态推送
 * 
 * 2. 短信通知服务
 *    - 参考 backend/services/sms.ts
 *    - 用于紧急订单状态通知
 */
export const EmergencyOrderTracker: React.FC<EmergencyOrderTrackerProps> = ({
  orderId,
  initialDroneStatus
}) => {
  const [droneStatus, setDroneStatus] = useState(initialDroneStatus);
  const [deliveryPath, setDeliveryPath] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 订阅无人机状态更新
    socket.on(`droneUpdate:${orderId}`, (status) => {
      setDroneStatus(status);
      setProgress(status.progress);
    });

    // 获取配送路径
    const fetchDeliveryPath = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}/path`);
        const data = await response.json();
        setDeliveryPath(data.path);
      } catch (error) {
        console.error('Failed to fetch delivery path:', error);
      }
    };

    fetchDeliveryPath();

    return () => {
      socket.off(`droneUpdate:${orderId}`);
    };
  }, [orderId]);

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Title level={4}>紧急订单追踪</Title>
        
        <div style={{ height: 400 }}>
          <Map
            center={droneStatus?.location}
            zoom={15}
            enableScrollWheelZoom
          >
            {/* 起点标记 */}
            <Marker position={deliveryPath[0]} />
            
            {/* 无人机当前位置 */}
            <Marker
              position={droneStatus?.location}
              icon="drone-icon.png"
              animation={BMAP_ANIMATION_BOUNCE}
            />
            
            {/* 终点标记 */}
            <Marker position={deliveryPath[deliveryPath.length - 1]} />
            
            {/* 配送路径 */}
            <Polyline
              path={deliveryPath}
              strokeColor="#1890ff"
              strokeWeight={4}
            />
          </Map>
        </div>

        <Space>
          <Tag color={droneStatus?.batteryLevel > 30 ? 'green' : 'red'}>
            电量: {droneStatus?.batteryLevel}%
          </Tag>
          <Tag color="blue">
            预计送达: {droneStatus?.estimatedArrival}
          </Tag>
        </Space>

        <Progress
          percent={progress}
          status={progress < 100 ? 'active' : 'success'}
          format={percent => `配送进度: ${percent}%`}
        />

        <Text type="secondary">
          订单状态: {droneStatus?.status}
        </Text>
      </Space>
    </Card>
  );
}; 