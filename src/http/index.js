import axios from 'axios'


//для обычных запросов без авторизации
const $host = axios.create({
    baseUrl: process.env.REACT_APP_API_URL
})


//Для запросов с авторизацией
const $authHost = axios.create({
    baseUrl: process.env.REACT_APP_API_URL
})


const authInterceptor = config => {
    config.header.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}



$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost,
}