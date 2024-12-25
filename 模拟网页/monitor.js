// 模拟无人机数据
const dronesData = [
    {
        id: 'D001',
        position: [108.953, 34.2778],
        status: '配送中',
        battery: '85%',
        speed: '12m/s',
        altitude: '120m',
        destination: '雁塔区某某医院',
        route: [
            [108.953, 34.2778],
            [108.956, 34.2780],
            [108.958, 34.2785]
        ],
        cargo: '青霉素',
        eta: '8分钟'
    },
    {
        id: 'D002',
        position: [108.943, 34.2658],
        status: '配送中',
        battery: '92%',
        speed: '10m/s',
        altitude: '100m',
        destination: '莲湖区某某药店',
        route: [
            [108.943, 34.2658],
            [108.945, 34.2660],
            [108.948, 34.2665]
        ],
        cargo: '布洛芬',
        eta: '12分钟'
    },
    {
        id: 'D003',
        position: [108.963, 34.2898],
        status: '待命',
        battery: '100%',
        speed: '0m/s',
        altitude: '0m',
        destination: '基地',
        route: [],
        cargo: '无',
        eta: '-'
    },
    {
        id: 'D004',
        position: [108.933, 34.2758],
        status: '充电中',
        battery: '20%',
        speed: '0m/s',
        altitude: '0m',
        destination: '基地',
        route: [],
        cargo: '无',
        eta: '-'
    }
];

let map;
let markers = [];
let polylines = [];

// 初始化地图
function initMap() {
    map = new BMap.Map("map");
    const point = new BMap.Point(108.953, 34.2778);
    map.centerAndZoom(point, 12);
    map.enableScrollWheelZoom();
    
    // 添加地图控件
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    
    // 初始化无人机标记
    updateDroneMarkers();
    
    // 更新无人机列表
    updateDroneList();
    
    // 更新时间
    updateTime();
    setInterval(updateTime, 1000);
}

// 更新无人机标记
function updateDroneMarkers() {
    // 清除现有标记
    markers.forEach(marker => map.removeOverlay(marker));
    polylines.forEach(line => map.removeOverlay(line));
    markers = [];
    polylines = [];
    
    dronesData.forEach(drone => {
        // 创建无人机图标
        const icon = new BMap.Icon(
            getDroneIcon(drone.status),
            new BMap.Size(30, 30)
        );
        
        const marker = new BMap.Marker(
            new BMap.Point(...drone.position),
            {icon: icon}
        );
        
        // 添加点击事件
        marker.addEventListener('click', () => showDroneInfo(drone));
        
        map.addOverlay(marker);
        markers.push(marker);
        
        // 如果有配送路线，绘制路线
        if (drone.route.length > 0) {
            const points = drone.route.map(pos => new BMap.Point(...pos));
            const polyline = new BMap.Polyline(points, {
                strokeColor: "#1890ff",
                strokeWeight: 3,
                strokeOpacity: 0.8
            });
            map.addOverlay(polyline);
            polylines.push(polyline);
        }
    });
}

// 根据状态返回不同的图标URL
function getDroneIcon(status) {
    // 这里应该返回实际的图标URL，现在用颜色区分
    switch(status) {
        case '配送中':
            return 'path/to/delivering-drone.png';
        case '待命':
            return 'path/to/standby-drone.png';
        case '充电中':
            return 'path/to/charging-drone.png';
        default:
            return 'path/to/default-drone.png';
    }
}

// 更新无人机列表
function updateDroneList() {
    const droneItems = document.querySelector('.drone-items');
    document.getElementById('drone-count').textContent = dronesData.length;
    
    droneItems.innerHTML = dronesData.map(drone => `
        <div class="drone-item ${drone.status.replace(/\s+/g, '-').toLowerCase()}" 
             onclick="showDroneInfo(${JSON.stringify(drone).replace(/"/g, '&quot;')})">
            <div class="drone-header">
                <span class="drone-id">${drone.id}</span>
                <span class="drone-status">${drone.status}</span>
            </div>
            <div class="drone-info">
                <p>电量：${drone.battery}</p>
                <p>速度：${drone.speed}</p>
                <p>目的地：${drone.destination}</p>
                <p>预计到达：${drone.eta}</p>
            </div>
        </div>
    `).join('');
}

// 显示无人机详细信息
function showDroneInfo(drone) {
    const infoDiv = document.getElementById('selected-drone-info');
    infoDiv.innerHTML = `
        <h4>无人机 ${drone.id}</h4>
        <div class="drone-details">
            <p><strong>状态：</strong>${drone.status}</p>
            <p><strong>电量：</strong>${drone.battery}</p>
            <p><strong>速度：</strong>${drone.speed}</p>
            <p><strong>高度：</strong>${drone.altitude}</p>
            <p><strong>目的地：</strong>${drone.destination}</p>
            <p><strong>载货：</strong>${drone.cargo}</p>
            <p><strong>预计到达：</strong>${drone.eta}</p>
        </div>
    `;
}

// 更新时间显示
function updateTime() {
    const now = new Date();
    document.getElementById('current-time').textContent = 
        now.toLocaleString('zh-CN', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
}

// 初始化事件监听
function initEvents() {
    // 状态筛选按钮
    document.querySelectorAll('.control-group button').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelector('.control-group button.active').classList.remove('active');
            this.classList.add('active');
            filterDrones(this.dataset.status);
        });
    });
}

// 筛选无人机显示
function filterDrones(status) {
    const filteredDrones = status === 'all' 
        ? dronesData 
        : dronesData.filter(drone => {
            const droneStatus = drone.status.replace(/\s+/g, '-').toLowerCase();
            return droneStatus === status;
        });
    
    updateDroneMarkers(filteredDrones);
    updateDroneList(filteredDrones);
}

// 页面加载完成后初始化
window.onload = function() {
    initMap();
    initEvents();
    
    // 模拟实时更新
    setInterval(() => {
        // 更新无人机位置
        dronesData.forEach(drone => {
            if (drone.status === '配送中') {
                // 模拟位置变化
                drone.position[0] += (Math.random() - 0.5) * 0.001;
                drone.position[1] += (Math.random() - 0.5) * 0.001;
            }
        });
        updateDroneMarkers();
    }, 3000);
}; 