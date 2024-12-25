// 初始化配送量趋势图表
function initDeliveryTrendChart() {
    const chart = echarts.init(document.getElementById('delivery-trend-chart'));
    
    const option = {
        title: {
            text: '近7天配送量趋势'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['3月1日', '3月2日', '3月3日', '3月4日', '3月5日', '3月6日', '3月7日']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '配送订单量',
            type: 'line',
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: true,
            lineStyle: {
                color: '#1890ff'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(24,144,255,0.3)'
                }, {
                    offset: 1,
                    color: 'rgba(24,144,255,0.1)'
                }])
            }
        }]
    };
    
    chart.setOption(option);
}

// 初始化区域分布图表
function initAreaDistributionChart() {
    const chart = echarts.init(document.getElementById('area-distribution-chart'));
    
    const option = {
        title: {
            text: '配送区域分布'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [{
            name: '配送订单',
            type: 'pie',
            radius: '60%',
            data: [
                {value: 335, name: '雁塔区'},
                {value: 310, name: '莲湖区'},
                {value: 234, name: '未央区'},
                {value: 135, name: '长安区'},
                {value: 148, name: '高新区'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    
    chart.setOption(option);
}

window.onload = function() {
    initDeliveryTrendChart();
    initAreaDistributionChart();
}; 