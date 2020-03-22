import axios from 'axios'
import { Message, Loading } from 'element-ui';
import qs from 'qs'

// 加载中动画
let loadingInstance

//设置请求超时 10S
let timeout = 10000

// 默认的接口url前缀
let baseURL
// 环境的切换
if (process.env.NODE_ENV == 'development') {
    baseURL = 'apis';
} else if (process.env.NODE_ENV == 'production') {
    baseURL = '*****';
}

const axiosdefault = axios.create({
    baseURL,
    timeout,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },

})



// request请求拦截器
axiosdefault.interceptors.request.use(
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
axiosdefault.interceptors.response.use(
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
        if (error.response.status) {
            switch (error.response.status) {
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
        // 关闭加载动画
        loadingInstance.close();
    }
)

// 具体的请求
export function request({
    methods, url, params
}) {
    if (methods == "GET") {
        return get(url, params)
    } else if (methods == "POST") {
        return post(url, params)
    } else {
        console.log('methods错误')
    }
}


/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
function get(url, params) {
    return new Promise((resolve, reject) => {
        axiosdefault.get(url, {
            params: params
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
function post(url, params) {
    params = qs.stringify(params)
    console.log(url, params)
    return new Promise((resolve, reject) => {
        axiosdefault.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}




//上传图片的方法
export function upload({ url, params }) {
    console.log('url', url)
    console.log('params', params)
    return new Promise((resolve, reject) => {
        axiosdefault.post(url, params).then(res => {
            resolve(res.data);
        }).catch(error => {
            reject(error);
        })
    })
}

