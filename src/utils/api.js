import { request, upload } from './http'

const api = {
    login(params) {
        return request({
            methods: "POST",
            url: '/login',
            params
        })
    },
    uploadfile(params) {
        return upload({
            methods: "POST",
            url: '/uploadFile',
            params
        })
    }
}
export default api