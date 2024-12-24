import React, { useEffect, useState } from 'react';
import { Map, Polyline, Marker, NavigationControl } from 'react-bmapgl';
import { Card, Timeline, Space, Tag } from 'antd';
import type { DeliveryPath } from '../types';

interface DeliveryPathVisualizerProps {
  orderId: string;
  path?: DeliveryPath;
}

/**
 * 配送路径可视化组件
 * 
 * 需要配置的接口：
 * 1. 百度地图API
 *    - 申请地址：https://lbsyun.baidu.com/
 *    - 所需权限：地图显示、路径规划
 * 
 * 2. 实时路径规划接口
 *    - 参考 backend/services/routePlanning.ts
 *    - 需实现路径实时优化逻辑
 */
const DeliveryPathVisualizer: React.FC<DeliveryPathVisualizerProps> = ({
  orderId,
  path: initialPath
}) => {
  const [path, setPath] = useState<DeliveryPath | undefined>(initialPath);
  const [loading, setLoading] = useState(!initialPath);

  useEffect(() => {
    if (!initialPath) {
      fetchPath();
    }
  }, [orderId, initialPath]);

  const fetchPath = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}/path`);
      const data = await response.json();
      setPath(data);
    } catch (error) {
      console.error('Failed to fetch path:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!path) return null;

  return (
    <Card loading={loading}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div style={{ height: 400 }}>
          <Map
            center={path.waypoints[0]}
            zoom={14}
            enableScrollWheelZoom
          >
            {/* 配送路径 */}
            <Polyline
              path={path.waypoints}
              strokeColor="#1890ff"
              strokeWeight={4}
              strokeOpacity={0.8}
            />

            {/* 起点 */}
            <Marker
              position={path.waypoints[0]}
              icon="start-point.png"
            />

            {/* 终点 */}
            <Marker
              position={path.waypoints[path.waypoints.length - 1]}
              icon="end-point.png"
            />

            {/* 途经点 */}
            {path.waypoints.slice(1, -1).map((point, index) => (
              <Marker
                key={index}
                position={point}
                icon="waypoint.png"
              />
            ))}

            <NavigationControl />
          </Map>
        </div>

        <Space>
          <Tag color="blue">总距离: {path.distance.toFixed(2)}km</Tag>
          <Tag color="green">预计时间: {path.estimatedTime}分钟</Tag>
        </Space>

        <Timeline>
          {path.checkpoints.map((checkpoint, index) => (
            <Timeline.Item
              key={index}
              color={checkpoint.passed ? 'green' : 'blue'}
            >
              <p>{checkpoint.name}</p>
              <p>{checkpoint.time}</p>
            </Timeline.Item>
          ))}
        </Timeline>
      </Space>
    </Card>
  );
};

export default DeliveryPathVisualizer; 