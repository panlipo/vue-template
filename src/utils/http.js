import axios from 'axios'
import { Message, Loading } from 'element-ui';
import qs from 'qs'

// 加载中动画
let loadingInstance

//设置请求超时 30S
let timeout = 30000

// 默认的接口url前缀
let baseURL

// 环境的切换
if (process.env.NODE_ENV == 'development') {
    baseURL = 'apis';
} else if (process.env.NODE_ENV == 'production') {
    baseURL = '***';
}

const instance = axios.create({
    baseURL,
    timeout
})



// request请求拦截器
instance.interceptors.request.use(
    config => {
        console.log('request,config', config)
        // 调用element  loding组件
        loadingInstance = Loading.service({
            lock: true,
            text: '正在努力加载中',
            background: 'rgba(0, 0, 0, 0.7)'
        })
        return config;
    },
    error => {
        console.log('request,error' + error)
        return Promise.error(error);
    }
)

// 响应拦截器
instance.interceptors.response.use(
    response => {
        console.log('response,response', response)
        // 关闭加载动画
        loadingInstance.close();
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
        // 否则的话抛出错误
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        console.log('response,error' + error)
        // 关闭加载动画
        loadingInstance.close();
        if (error.response.status) {
            switch (error.response.status) {
                // 500请求 服务器出错
                case 500:
                    Message({
                        message: '请求失败，请重试',
                        duration: 2000,
                        type: 'error'
                    });
                    break;
                // 404请求不存在
                case 404:
                    Message({
                        message: '网络请求不存在',
                        duration: 2000,
                        type: 'error'
                    });
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    Message({
                        message: error.response.status + '  错误',
                        duration: 2000,
                        type: 'error'
                    });
            }
            return Promise.reject(error.response);
        }

    }
)

// 请求
export function request(options) {
    return new Promise((resolve, reject) => {
        const {
            method, url, data, headers, noqs
        } = options
        let myheaders = Object.assign({
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }, headers)
        let obj = {
            method,
            url,
            headers: myheaders
        }
        console.log(data, 'before..................')
        if (method == 'GET') {
            obj.params = data
        } else {
            if (noqs) {
                obj.data = data
            } else {
                obj.data = qs.stringify(data)
            }
        }
        console.log(data, 'after..................')
        console.log(obj)
        instance(obj).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })

    })
}

