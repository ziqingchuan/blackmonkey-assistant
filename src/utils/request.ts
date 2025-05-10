import axios from 'axios'

//创建一个axios的实例service
const service = axios.create({
    timeout: 60000 // 1 minute timeout
})

//判断是否登录
function hasToken() {
    return !(localStorage.getItem('token') == '')
}

//当前实例的拦截器，对所有要发送给后端的请求进行处理，在其中加入token
service.interceptors.request.use(
    config => {
        if (hasToken()) {
            config.headers['token'] = localStorage.getItem('token')
        }
        return config
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
)

//当前实例的拦截器，对所有从后端收到的请求进行处理，检验http的状态码
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response;
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        console.log('Request error:', error);
        if (error.response) {
            console.log('Error response data:', error.response.data);
        }
        return Promise.reject(error);
    }
)

//设置为全局变量
export {
    service as axios
}
