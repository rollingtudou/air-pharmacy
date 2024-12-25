// 模拟订单数据
const orders = [
    {
        id: 'O001',
        status: '配送中',
        address: '雁塔区某某街道128号',
        contact: '张先生 13812345678',
        medicine: '青霉素',
        priority: 'urgent',
        eta: '15分钟',
        droneId: 'D001',
        createTime: '2024-03-07 14:30'
    },
    {
        id: 'O002',
        status: '待分配',
        address: '莲湖区某某小区5号楼',
        contact: '李女士 13912345678',
        medicine: '布洛芬',
        priority: 'normal',
        eta: '待分配',
        droneId: null,
        createTime: '2024-03-07 14:35'
    },
    {
        id: 'O003',
        status: '配送中',
        address: '未央区某某医院',
        medicine: '肾上腺素',
        priority: 'urgent',
        contact: '王医生 13712345678',
        eta: '8分钟',
        droneId: 'D004',
        createTime: '2024-03-07 14:20'
    }
];

// 模拟无人机数据
const drones = [
    {
        id: 'D001',
        status: '配送中',
        battery: '85%',
        location: '雁塔区',
        currentOrder: 'O001',
        lastMaintenance: '2024-03-06'
    },
    {
        id: 'D002',
        status: '可用',
        battery: '100%',
        location: '基地',
        currentOrder: null,
        lastMaintenance: '2024-03-05'
    },
    {
        id: 'D003',
        status: '充电中',
        battery: '20%',
        location: '基地',
        currentOrder: null,
        lastMaintenance: '2024-03-07'
    },
    {
        id: 'D004',
        status: '配送中',
        battery: '90%',
        location: '莲湖区',
        currentOrder: 'O003',
        lastMaintenance: '2024-03-04'
    }
];

// 渲染订单列表
function renderOrders(filteredOrders = orders) {
    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = filteredOrders.map(order => `
        <div class="order-item">
            <div class="order-header">
                <span class="order-id">${order.id}</span>
                <span class="order-status ${getStatusClass(order.status)}">${order.status}</span>
            </div>
            <div class="order-info">
                <p><strong>配送地址：</strong>${order.address}</p>
                <p><strong>联系方式：</strong>${order.contact}</p>
                <p><strong>药品信息：</strong>${order.medicine}</p>
                <p><strong>预计送达：</strong>${order.eta}</p>
                ${order.priority === 'urgent' ? '<span class="priority-tag">加急</span>' : ''}
            </div>
            <div class="order-actions">
                ${getOrderActions(order)}
            </div>
        </div>
    `).join('');
}

// 渲染无人机列表
function renderDrones(filteredDrones = drones) {
    const dronesList = document.getElementById('drones-list');
    dronesList.innerHTML = filteredDrones.map(drone => `
        <div class="drone-item ${drone.status.replace(/\s+/g, '-').toLowerCase()}">
            <div class="drone-header">
                <span class="drone-id">${drone.id}</span>
                <span class="drone-status">${drone.status}</span>
            </div>
            <div class="drone-info">
                <p><strong>电量：</strong>${drone.battery}</p>
                <p><strong>位置：</strong>${drone.location}</p>
                <p><strong>当前任务：</strong>${drone.currentOrder || '无'}</p>
                <p><strong>最后维护：</strong>${drone.lastMaintenance}</p>
            </div>
            <div class="drone-actions">
                ${getDroneActions(drone)}
            </div>
        </div>
    `).join('');
}

// 获取订单状态对应的类名
function getStatusClass(status) {
    switch(status) {
        case '待分配': return 'pending';
        case '配送中': return 'delivering';
        case '已完成': return 'completed';
        default: return '';
    }
}

// 获取订单操作按钮
function getOrderActions(order) {
    if (order.status === '待分配') {
        return `
            <button class="btn-assign" onclick="assignDrone('${order.id}')">分配无人机</button>
            <button class="btn-detail" onclick="showOrderDetail('${order.id}')">详情</button>
        `;
    }
    return `<button class="btn-detail" onclick="showOrderDetail('${order.id}')">详情</button>`;
}

// 获取无人机操作按钮
function getDroneActions(drone) {
    if (drone.status === '可用') {
        return `<button class="btn-assign" onclick="assignOrder('${drone.id}')">分配任务</button>`;
    }
    return '';
}

// 初始化模态框
function initModal() {
    const modal = document.getElementById('new-order-modal');
    const btnNew = document.querySelector('.btn-primary');
    const btnClose = document.querySelector('.btn-close');
    const btnCancel = document.querySelector('.btn-cancel');
    const btnSubmit = document.querySelector('.btn-submit');

    btnNew.addEventListener('click', () => modal.style.display = 'block');
    btnClose.addEventListener('click', () => modal.style.display = 'none');
    btnCancel.addEventListener('click', () => modal.style.display = 'none');
    btnSubmit.addEventListener('click', handleNewOrder);

    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
}

// 处理新建订单
function handleNewOrder() {
    const form = document.getElementById('new-order-form');
    // 这里添加表单验证和提交逻辑
    alert('订单创建成功！');
    document.getElementById('new-order-modal').style.display = 'none';
}

// 分配无人机
function assignDrone(orderId) {
    const availableDrones = drones.filter(drone => drone.status === '可用');
    if (availableDrones.length === 0) {
        alert('当前没有可用的无人机！');
        return;
    }
    // 这里添加分配逻辑
    alert(`正在为订单 ${orderId} 分配无人机...`);
}

// 分配订单
function assignOrder(droneId) {
    const pendingOrders = orders.filter(order => order.status === '待分配');
    if (pendingOrders.length === 0) {
        alert('当前没有待分配的订单！');
        return;
    }
    // 这里添加分配逻辑
    alert(`正在为无人机 ${droneId} 分配订单...`);
}

// 显示订单详情
function showOrderDetail(orderId) {
    const order = orders.find(o => o.id === orderId);
    alert(`订单详情：\n${JSON.stringify(order, null, 2)}`);
}

// 初始化事件监听
function initEvents() {
    // 订单筛选
    document.querySelectorAll('.order-filters button').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelector('.order-filters button.active').classList.remove('active');
            this.classList.add('active');
            const status = this.dataset.status;
            const filteredOrders = status === 'all' ? orders : orders.filter(order => 
                getStatusClass(order.status) === status
            );
            renderOrders(filteredOrders);
        });
    });

    // 无人机筛选
    document.querySelectorAll('.drone-filters button').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelector('.drone-filters button.active').classList.remove('active');
            this.classList.add('active');
            const status = this.dataset.status;
            const filteredDrones = status === 'all' ? drones : drones.filter(drone => 
                drone.status.replace(/\s+/g, '-').toLowerCase() === status
            );
            renderDrones(filteredDrones);
        });
    });

    // 搜索功能
    document.querySelector('.btn-search').addEventListener('click', handleSearch);
    document.querySelector('.search-box input').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') handleSearch();
    });
}

// 处理搜索
function handleSearch() {
    const searchValue = document.querySelector('.search-box input').value.toLowerCase();
    const filteredOrders = orders.filter(order => 
        order.id.toLowerCase().includes(searchValue) ||
        order.address.toLowerCase().includes(searchValue) ||
        order.contact.toLowerCase().includes(searchValue)
    );
    renderOrders(filteredOrders);
}

// 页面加载完成后初始化
window.onload = function() {
    renderOrders();
    renderDrones();
    initModal();
    initEvents();
}; 