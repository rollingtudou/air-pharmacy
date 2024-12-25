// 初始化所有图表和事件
function init() {
    initInventoryTrendChart();
    initCategoryChart();
    initEvents();
}

// 初始化库存趋势图表
function initInventoryTrendChart() {
    const chart = echarts.init(document.getElementById('inventory-trend-chart'));
    
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['当前库存', '安全库存']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['青霉素', '肾上腺素', '硝酸甘油', '胰岛素', '布洛芬']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '当前库存',
                type: 'bar',
                data: [150, 50, 80, 120, 80],
                itemStyle: {
                    color: '#1890ff'
                }
            },
            {
                name: '安全库存',
                type: 'line',
                data: [100, 100, 150, 100, 200],
                itemStyle: {
                    color: '#ff4d4f'
                },
                lineStyle: {
                    type: 'dashed'
                }
            }
        ]
    };
    
    chart.setOption(option);
}

// 初始化分类统计图表
function initCategoryChart() {
    const chart = echarts.init(document.getElementById('inventory-category-chart'));
    
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        },
        series: [
            {
                name: '库存分类',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '20',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 485, name: '处方药' },
                    { value: 300, name: '非处方药' },
                    { value: 234, name: '医疗器械' },
                    { value: 267, name: '急救药品' }
                ]
            }
        ]
    };
    
    chart.setOption(option);
}

// 初始化事件监听
function initEvents() {
    // 搜索功能
    document.querySelector('.btn-search').addEventListener('click', handleSearch);
    document.querySelector('.search-box input').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') handleSearch();
    });

    // 分类筛选
    document.querySelector('.category-select').addEventListener('change', handleFilter);

    // 新增药品按钮
    document.querySelector('.btn-add').addEventListener('click', handleAddMedicine);

    // 补货按钮
    document.querySelectorAll('.btn-restock').forEach(btn => {
        btn.addEventListener('click', handleRestock);
    });

    // 详情按钮
    document.querySelectorAll('.btn-detail').forEach(btn => {
        btn.addEventListener('click', handleDetail);
    });
}

// 搜索处理
function handleSearch() {
    const searchValue = document.querySelector('.search-box input').value.toLowerCase();
    const rows = document.querySelectorAll('.inventory-table tbody tr');
    
    rows.forEach(row => {
        const medicineName = row.querySelector('.medicine-name').textContent.toLowerCase();
        row.style.display = medicineName.includes(searchValue) ? '' : 'none';
    });
}

// 分类筛选处理
function handleFilter(e) {
    const category = e.target.value;
    const rows = document.querySelectorAll('.inventory-table tbody tr');
    
    rows.forEach(row => {
        if (category === '全部分类') {
            row.style.display = '';
            return;
        }
        const medicineCategory = row.querySelector('td:nth-child(2)').textContent;
        row.style.display = medicineCategory === category ? '' : 'none';
    });
}

// 新增药品处理
function handleAddMedicine() {
    alert('打开新增药品表单');
    // 这里可以实现打开模态框等功能
}

// 补货处理
function handleRestock(e) {
    const row = e.target.closest('tr');
    const medicineName = row.querySelector('.medicine-name').textContent;
    const currentStock = row.querySelector('td:nth-child(3)').textContent;
    const safeStock = row.querySelector('td:nth-child(4)').textContent;
    
    alert(`补货操作：\n药品：${medicineName}\n当前库存：${currentStock}\n安全库存：${safeStock}`);
    // 这里可以实现打开补货表单等功能
}

// 详情处理
function handleDetail(e) {
    const row = e.target.closest('tr');
    const medicineName = row.querySelector('.medicine-name').textContent;
    
    alert(`查看${medicineName}详细信息`);
    // 这里可以实现打开详情模态框等功能
}

// 页面加载完成后初始化
window.onload = init;

// 窗口大小改变时重绘图表
window.addEventListener('resize', function() {
    const trendChart = echarts.getInstanceByDom(document.getElementById('inventory-trend-chart'));
    const categoryChart = echarts.getInstanceByDom(document.getElementById('inventory-category-chart'));
    if (trendChart) trendChart.resize();
    if (categoryChart) categoryChart.resize();
}); 