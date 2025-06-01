/**
 * @Description: 全局函数，防止出现重复性代码冗余而封装的各种功能
 * @Author: Qingchuan Zi
 */
import {ref} from "vue";
import * as echarts from 'echarts';
export const customAlert = ref(); // 获取弹窗组件的引用

// 退出登录
export function logout(router: any) {
    showAlert('天命人，确认要离开吗？', 1).then((res: any) => {
        if(res) { // 点击确认
            localStorage.removeItem('userProfile');
            localStorage.removeItem('token');
            localStorage.removeItem('hasBindSteam');
            localStorage.removeItem('last_played');
            localStorage.removeItem('playtime_hours');
            localStorage.removeItem('avatar');
            localStorage.removeItem('name');
            localStorage.removeItem('achievements');
            router.push('/index');
        }
    });
}

// 显示弹窗
export const showAlert = (message: string, type: number) => {
    return customAlert.value.show(message, type);
};

// 设置float动画
export function setupFloatAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 动画完成后取消观察
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // 当元素10%进入视口时触发
        rootMargin: '0px 0px -50px 0px' // 底部margin，可以提前触发
    });

    // 观察所有带有.float-up类的元素
    document.querySelectorAll('.float-up').forEach(el => {
        observer.observe(el);
    });
}

// 辅助函数：格式化日期为 YYYY-MM-DD
export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 格式化日期与时间
export const formatTime = (isoString: string): string => {
    const date = new Date(isoString);

    // 提取年月日时分
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从0开始
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
};

// 图表数据变量
export const pieChartData = ref<{name: string, value: number}[]>([]);
export const lineChartData = ref<{date: string, count: number}[]>([]);

// 图表实例引用
export let pieChart: echarts.ECharts | null = null;
export let lineChart: echarts.ECharts | null = null;

// 初始化饼图
export function initPieChart() {
    if (!pieChartData.value.length) return;

    const chartDom = document.getElementById('pieChart');
    if (!chartDom) return;

    pieChart = echarts.init(chartDom);

    const option: echarts.EChartsOption = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'horizontal',
            bottom: 10,
            textStyle: {
                color: '#a89c7c'
            }
        },
        series: [
            {
                name: '成就数量',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#1a1a1d',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    formatter: '{b}: 达成{c}个成就',
                    color: '#e7cc80'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '16',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    lineStyle: {
                        color: '#a89c7c'
                    }
                },
                data: pieChartData.value
            }
        ],
        color: [
            '#e7cc80', '#d3a663', '#c09056', '#a97e45',
            '#946c38', '#7f5a2c', '#6a4820', '#553615'
        ]
    };

    pieChart.setOption(option);

    // 响应式调整
    window.addEventListener('resize', () => {
        pieChart?.resize();
    });
}

// 销毁饼图
export function destroyPieChart() {
    if (pieChart) {
        pieChart.dispose();
        pieChart = null;
    }
}
// 初始化折线图
export function initLineChart() {
    if (!lineChartData.value.length) return;

    const chartDom = document.getElementById('lineChart');
    if (!chartDom) return;

    lineChart = echarts.init(chartDom);

    const dates = lineChartData.value.map(item => item.date);
    const counts = lineChartData.value.map(item => item.count);

    const option: echarts.EChartsOption = {
        tooltip: {
            trigger: 'axis',
            formatter: (params: any) => {
                const param = params[0];
                return `日期: ${param.name}<br/>成就数量: ${param.value}`;
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: dates,
            axisLine: {
                lineStyle: {
                    color: '#a89c7c'
                }
            },
            axisLabel: {
                color: '#e7cc80',
                interval: Math.ceil(dates.length / 7) // 显示部分日期避免重叠
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#a89c7c'
                }
            },
            axisLabel: {
                color: '#e7cc80'
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(168, 156, 124, 0.2)'
                }
            }
        },
        series: [
            {
                name: '成就数量',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: {
                    width: 3,
                    color: '#e7cc80'
                },
                itemStyle: {
                    color: '#d3b479'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(231, 204, 128, 0.3)' },
                        { offset: 1, color: 'rgba(231, 204, 128, 0.1)' }
                    ])
                },
                data: counts
            }
        ]
    };

    lineChart.setOption(option);

    // 响应式调整
    window.addEventListener('resize', () => {
        lineChart?.resize();
    });
}

// 销毁折线图
export function destroyLineChart() {
    if (lineChart) {
        lineChart.dispose();
        lineChart = null;
    }
}
