import {ref} from "vue";
import {useRouter} from "vue-router";

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