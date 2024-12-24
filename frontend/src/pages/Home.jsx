import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>急速送药 - 无人机配送服务</h1>
        <p>紧急情况下的药品配送专家，15分钟极速送达</p>
      </header>
      
      <section className="services">
        <h2>我们的服务</h2>
        <div className="service-cards">
          <div className="service-card">
            <h3>紧急用药</h3>
            <p>24小时无人机配送服务</p>
          </div>
          <div className="service-card">
            <h3>处方药配送</h3>
            <p>专业药师在线审核</p>
          </div>
          <div className="service-card">
            <h3>常规药品</h3>
            <p>日常用药配送服务</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 