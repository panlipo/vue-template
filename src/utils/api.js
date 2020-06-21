import { request } from './http'

const api = {
    login(data) {
        return request({
            method: "POST",
            url: '/login',
            data
        })
    },
    uploadfile(data) {
        return request({
            method: "POST",
            url: '/rulephoto',
            data,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            noqs: true
        })
    },

}
export default api