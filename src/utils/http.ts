//  src/utils/request.ts

import axios from 'axios';
import type {AxiosResponse, AxiosError } from 'axios';
import { ElMessage} from "element-plus";


// 创建 axios 实例
const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    timeout: 50000,
    headers: { "Content-Type": "application/json;charset=utf-8" },
});



// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);
// 响应拦截器
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        // 对响应数据做点什么
        if (response.data.code !== 200) {
            ElMessage.error(response.data.message);
            return Promise.reject(response.data);
        }
        return response.data; // 直接返回数据
    },
    (error: AxiosError) => {
        // 对响应错误做点什么
        if (error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            // @ts-ignore
            ElMessage.error('API Error:', error.response);
            // 返回后端返回的错误数据
            return Promise.reject(error.response.data);
        } else if (error.request) {
            // 请求已发出，但没有收到响应
            ElMessage.error('API Error:', error.request);
            return Promise.reject(error.request);
        } else {
            // 在设置请求时触发了错误
            // @ts-ignore
            ElMessage.error('API Error:', error.message);
            return Promise.reject(error.message);
        }
    }
);
// export function get(url:any, params = {}) {
//     return instance.get(url, { params });
// }

// 定义 get 函数，显式类型
export function get<T>(url: string, params: Record<string, any> = {}): Promise<T> {
    return instance.get(url, { params });
}

export function post(url:any, data = {}) {
    return instance.post(url, data);
}

export function put(url:any, data = {}) {
    return instance.put(url, data);
}

export function del(url:any) {
    return instance.delete(url);
}

export default instance;