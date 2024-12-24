import React, { useState, useEffect } from 'react';
import '../styles/Products.css';

const Products = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 这里添加获取药品数据的API调用
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    // TODO: 实现API调用
    setLoading(false);
  };

  return (
    <div className="products-container">
      <h2>药品目录</h2>
      <div className="filters">
        <select>
          <option value="">药品分类</option>
          <option value="emergency">急救药品</option>
          <option value="prescription">处方药</option>
          <option value="otc">非处方药</option>
        </select>
      </div>
      
      <div className="medicine-grid">
        {loading ? (
          <p>加载中...</p>
        ) : (
          medicines.map(medicine => (
            <div key={medicine.id} className="medicine-card">
              <img src={medicine.image} alt={medicine.name} />
              <h3>{medicine.name}</h3>
              <p>{medicine.description}</p>
              <p className="price">¥{medicine.price}</p>
              <button className="add-to-cart">加入购物车</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products; 