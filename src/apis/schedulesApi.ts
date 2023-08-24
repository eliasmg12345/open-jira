import axios from "axios"

const schedulesApi = axios.create({
    baseURL: '/api'
})

export default schedulesApi;