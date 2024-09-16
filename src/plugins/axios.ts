import axios from 'axios'
import apiBaseUrl from '@/global'

const axiosInstance = axios.create({
    baseURL: apiBaseUrl
})

export default axiosInstance
