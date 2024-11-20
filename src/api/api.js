import axios from 'axios'
const local = 'https://tractor-backend-xk1t.onrender.com'
const production = ''
const api = axios.create({
    baseURL: `${local}/api`,
    withCredentials : true
})
export default api