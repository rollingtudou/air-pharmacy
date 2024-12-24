import React, { useEffect, useState } from 'react';
import { Map, Marker, InfoWindow, NavigationControl, ZoomControl } from 'react-bmapgl';
import { Card, Table, Badge, Space, Button, Modal, Statistic, Row, Col } from 'antd';
import { socket } from '../services/socket';
import type { Drone, DroneStatus } from '../types';

/**
 * 无人机管理页面
 * 
 * 需要配置的接口：
 * 1. 无人机控制接口
 *    - 参考 backend/services/droneControl.ts
 *    - 需实现完整的控制指令集
 * 
 * 2. 天气服务接口
 *    - 参考 frontend/src/services/weather.ts
 *    - 用于飞行条件评估
 * 
 * 3. 设备监控接口
 *    - 需实现实时状态监控
 *    - 需实现故障预警
 */
export const DroneManagement: React.FC = () => {
  const [drones, setDrones] = useState<Drone[]>([]);
  const [selectedDrone, setSelectedDrone] = useState<Drone | null>(null);
  const [mapCenter, setMapCenter] = useState({ lng: 116.404, lat: 39.915 });
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);

  useEffect(() => {
    // 获取所有无人机数据
    fetchDrones();

    // 订阅无人机状态更新
    socket.on('droneStatusUpdate', handleDroneUpdate);

    return () => {
      socket.off('droneStatusUpdate');
    };
  }, []);

  const fetchDrones = async () => {
    try {
      const response = await fetch('/api/drones');
      const data = await response.json();
      setDrones(data);
    } catch (error) {
      console.error('Failed to fetch drones:', error);
    }
  };

  const handleDroneUpdate = (update: DroneStatus) => {
    setDrones(prev => prev.map(drone => 
      drone._id === update.droneId 
        ? { ...drone, ...update }
        : drone
    ));
  };

  const handleDroneClick = (drone: Drone) => {
    setSelectedDrone(drone);
    setInfoWindowVisible(true);
    setMapCenter({
      lng: drone.currentLocation.coordinates[0],
      lat: drone.currentLocation.coordinates[1]
    });
  };

  const getDroneIcon = (drone: Drone) => {
    const icons = {
      available: 'drone-available.png',
      busy: 'drone-busy.png',
      maintenance: 'drone-maintenance.png',
      charging: 'drone-charging.png',
      offline: 'drone-offline.png'
    };
    return icons[drone.status] || icons.offline;
  };

  const columns = [
    {
      title: '无人机ID',
      dataIndex: 'droneId',
      key: 'droneId',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge 
          status={
            status === 'available' ? 'success' :
            status === 'busy' ? 'processing' :
            status === 'maintenance' ? 'warning' :
            status === 'charging' ? 'default' : 'error'
          }
          text={status}
        />
      )
    },
    {
      title: '电量',
      dataIndex: 'batteryLevel',
      key: 'batteryLevel',
      render: (battery: number) => (
        <Badge 
          color={battery > 30 ? 'green' : 'red'} 
          text={`${battery}%`}
        />
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, drone: Drone) => (
        <Space>
          <Button 
            type="primary" 
            size="small"
            onClick={() => handleDroneClick(drone)}
          >
            定位
          </Button>
          <Button 
            size="small"
            onClick={() => handleMaintenanceClick(drone)}
          >
            维护
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="无人机实时监控">
            <div style={{ height: 600 }}>
              <Map
                center={mapCenter}
                zoom={12}
                enableScrollWheelZoom
              >
                {drones.map(drone => (
                  <Marker
                    key={drone._id}
                    position={{
                      lng: drone.currentLocation.coordinates[0],
                      lat: drone.currentLocation.coordinates[1]
                    }}
                    icon={getDroneIcon(drone)}
                    onClick={() => handleDroneClick(drone)}
                  />
                ))}
                
                {selectedDrone && infoWindowVisible && (
                  <InfoWindow
                    position={{
                      lng: selectedDrone.currentLocation.coordinates[0],
                      lat: selectedDrone.currentLocation.coordinates[1]
                    }}
                    onClose={() => setInfoWindowVisible(false)}
                  >
                    <div>
                      <h4>无人机信息</h4>
                      <p>ID: {selectedDrone.droneId}</p>
                      <p>状态: {selectedDrone.status}</p>
                      <p>电量: {selectedDrone.batteryLevel}%</p>
                      {selectedDrone.currentOrder && (
                        <p>当前订单: {selectedDrone.currentOrder}</p>
                      )}
                    </div>
                  </InfoWindow>
                )}

                <NavigationControl />
                <ZoomControl />
              </Map>
            </div>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="无人机列表">
            <Table
              columns={columns}
              dataSource={drones}
              rowKey="_id"
              pagination={false}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic
              title="在线无人机"
              value={drones.filter(d => d.status !== 'offline').length}
              suffix={`/ ${drones.length}`}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="执行任务"
              value={drones.filter(d => d.status === 'busy').length}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="充电中"
              value={drones.filter(d => d.status === 'charging').length}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DroneManagement; 