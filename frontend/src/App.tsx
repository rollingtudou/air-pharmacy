import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import DroneManagement from './pages/DroneManagement';
import EmergencyOrder from './pages/EmergencyOrder';
import InventoryManagement from './pages/InventoryManagement';
import AppHeader from './components/AppHeader';
import AppSidebar from './components/AppSidebar';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <AppHeader />
        <Layout>
          <AppSidebar />
          <Content style={{ padding: '24px', background: '#fff' }}>
            <Routes>
              <Route path="/drones" element={<DroneManagement />} />
              <Route path="/emergency" element={<EmergencyOrder />} />
              <Route path="/inventory" element={<InventoryManagement />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App; 