import React, { useEffect, useState } from 'react';
import { Card, Table, Tag, Alert, Space, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { InventoryAlert } from '../types';

interface InventoryAlertPanelProps {
  onReorder?: (productId: string) => void;
}

const InventoryAlertPanel: React.FC<InventoryAlertPanelProps> = ({ onReorder }) => {
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 300000); // 每5分钟更新一次

    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/inventory/alerts');
      const data = await response.json();
      setAlerts(data);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = (productId: string) => {
    Modal.confirm({
      title: '确认补货',
      icon: <ExclamationCircleOutlined />,
      content: '是否确认为该药品创建补货订单？',
      onOk: () => onReorder?.(productId),
    });
  };

  const columns = [
    {
      title: '药品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag color={
          category === 'emergency' ? 'red' :
          category === 'prescription' ? 'blue' : 'green'
        }>
          {category}
        </Tag>
      )
    },
    {
      title: '当前库存',
      dataIndex: 'currentStock',
      key: 'currentStock',
      render: (stock: number, record: InventoryAlert) => (
        <Tag color={stock <= record.criticalStock ? 'red' : 'orange'}>
          {stock}
        </Tag>
      )
    },
    {
      title: '警戒库存',
      dataIndex: 'criticalStock',
      key: 'criticalStock',
    },
    {
      title: '过期时间',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      render: (date: string) => new Date(date).toLocaleDateString()
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: InventoryAlert) => (
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => handleReorder(record.id)}
          >
            补货
          </Button>
        </Space>
      )
    }
  ];

  const emergencyAlerts = alerts.filter(alert => 
    alert.category === 'emergency' && alert.currentStock <= alert.criticalStock
  );

  return (
    <Card title="库存预警">
      {emergencyAlerts.length > 0 && (
        <Alert
          message="紧急药品库存预警"
          description={`有 ${emergencyAlerts.length} 种紧急药品库存不足，请及时处理！`}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <Table
        columns={columns}
        dataSource={alerts}
        rowKey="id"
        loading={loading}
        pagination={false}
      />
    </Card>
  );
};

export default InventoryAlertPanel; 