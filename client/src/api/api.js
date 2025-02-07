import axios from 'axios'
const local = 'http://localhost:5000'
const production = 'https://6qsp6n1w-5000.use.devtunnels.ms'
const api = axios.create({
    baseURL: `${local}/api`,
    withCredentials : true
})
export default api