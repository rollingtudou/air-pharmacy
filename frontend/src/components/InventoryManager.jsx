import React, { useState, useEffect } from 'react';
import '../styles/InventoryManager.css';

const InventoryManager = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await fetch('/api/inventory');
      const data = await response.json();
      setInventory(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleReorder = async (itemId) => {
    try {
      await fetch(`/api/inventory/${itemId}/reorder`, {
        method: 'POST'
      });
      fetchInventory();
    } catch (error) {
      console.error('Error reordering item:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      available: '#4CAF50',
      low: '#FFC107',
      expired: '#F44336',
      reserved: '#2196F3'
    };
    return colors[status] || '#999';
  };

  return (
    <div className="inventory-manager">
      <h2>库存管理</h2>
      
      <div className="inventory-filters">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">全部</option>
          <option value="low">库存不足</option>
          <option value="expired">已过期</option>
          <option value="available">可用</option>
        </select>
      </div>

      {loading ? (
        <p>加载中...</p>
      ) : (
        <div className="inventory-grid">
          {inventory
            .filter(item => filter === 'all' || item.status === filter)
            .map(item => (
              <div key={item._id} className="inventory-item">
                <div className="item-header">
                  <h3>{item.medicine.name}</h3>
                  <span 
                    className="status-indicator"
                    style={{ backgroundColor: getStatusColor(item.status) }}
                  >
                    {item.status}
                  </span>
                </div>
                
                <div className="item-details">
                  <p>数量: {item.quantity}</p>
                  <p>批号: {item.batchNumber}</p>
                  <p>有效期至: {new Date(item.expirationDate).toLocaleDateString()}</p>
                  <p>库位: {item.location.warehouse} - {item.location.shelf}</p>
                </div>

                {item.quantity <= item.reorderPoint && (
                  <button 
                    className="reorder-btn"
                    onClick={() => handleReorder(item._id)}
                  >
                    补货
                  </button>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default InventoryManager; 