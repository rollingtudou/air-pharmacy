import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  DashboardOutlined, 
  MedicineBoxOutlined, 
  RocketOutlined 
} from '@ant-design/icons';

const { Sider } = Layout;

const AppSidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Sider width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
        onClick={({ key }) => navigate(key)}
      >
        <Menu.Item key="/drones" icon={<RocketOutlined />}>
          无人机管理
        </Menu.Item>
        <Menu.Item key="/emergency" icon={<MedicineBoxOutlined />}>
          紧急订单
        </Menu.Item>
        <Menu.Item key="/inventory" icon={<DashboardOutlined />}>
          库存管理
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AppSidebar; 