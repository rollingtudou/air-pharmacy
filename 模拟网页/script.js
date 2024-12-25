// 初始化地图
function initMap() {
    const map = new BMap.Map("map");
    const point = new BMap.Point(108.953, 34.2778); // 西安市中心坐标
    map.centerAndZoom(point, 12);
    map.enableScrollWheelZoom();
    
    // 添加一些模拟的无人机标记点
    const dronePositions = [
        {lat: 34.2778, lng: 108.953},
        {lat: 34.2658, lng: 108.943},
        {lat: 34.2898, lng: 108.963}
    ];
    
    dronePositions.forEach(pos => {
        const marker = new BMap.Marker(new BMap.Point(pos.lng, pos.lat));
        map.addOverlay(marker);
    });
}

// 初始化库存图表
function initInventoryChart() {
    const chart = echarts.init(document.getElementById('inventory-chart'));
    
    const option = {
        title: {
            text: '重点药品库存状态'
        },
        tooltip: {},
        legend: {
            data: ['当前库存', '安全库存']
        },
        xAxis: {
            data: ['青霉素', '布洛芬', '阿莫西林', '头孢', '感冒药']
        },
        yAxis: {},
        series: [{
            name: '当前库存',
            type: 'bar',
            data: [150, 230, 224, 218, 135]
        }, {
            name: '安全库存',
            type: 'line',
            data: [100, 200, 200, 200, 100]
        }]
    };
    
    chart.setOption(option);
}

// 模拟订单数据
const orders = [
    {id: 'O001', status: '配送中', address: '雁塔区某某街道', eta: '15分钟'},
    {id: 'O002', status: '待配送', address: '莲湖区某某小区', eta: '待分配'},
    {id: 'O003', status: '配送中', address: '未央区某某医院', eta: '8分钟'}
];

// 渲染订单列表
function renderOrders() {
    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = orders.map(order => `
        <div class="order-item">
            <h4>订单号：${order.id}</h4>
            <p>状态：${order.status}</p>
            <p>配送地址：${order.address}</p>
            <p>预计送达：${order.eta}</p>
        </div>
    `).join('');
}

// 模拟无人机数据
const drones = [
    {id: 'D001', status: '配送中', battery: '85%', location: '雁塔区'},
    {id: 'D002', status: '待命中', battery: '100%', location: '基地'},
    {id: 'D003', status: '充电中', battery: '20%', location: '基地'},
    {id: 'D004', status: '配送中', battery: '90%', location: '莲湖区'}
];

// 渲染无人机状态列表
function renderDrones() {
    const dronesList = document.getElementById('drones-list');
    dronesList.innerHTML = drones.map(drone => `
        <div class="order-item">
            <h4>无人机：${drone.id}</h4>
            <p>状态：${drone.status}</p>
            <p>电量：${drone.battery}</p>
            <p>当前位置：${drone.location}</p>
        </div>
    `).join('');
}

// 页面加载完成后初始化
window.onload = function() {
    try {
        initMap();
    } catch (e) {
        console.log('地图初始化失败，请检查密钥是否正确');
        document.getElementById('map').innerHTML = '地图加载失败，请检查API密钥';
    }
    initInventoryChart();
    renderOrders();
    renderDrones();
    
    // 添加定时刷新功能
    setInterval(() => {
        // 模拟数据更新
        orders.forEach(order => {
            if (order.status === '配送中') {
                const eta = parseInt(order.eta);
                if (typeof eta === 'number') {
                    order.eta = Math.max(0, eta - 1) + '分钟';
                }
            }
        });
        renderOrders();
    }, 60000); // 每分钟更新一次
}; 