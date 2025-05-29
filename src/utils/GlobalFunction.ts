import {ref} from "vue";

export const customAlert = ref(); // 获取弹窗组件的引用
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