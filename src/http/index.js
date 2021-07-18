import axios from 'axios'


//для обычных запросов без авторизации
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})


//Для запросов с авторизацией
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})


const authInterceptor = config => {
    console.log(localStorage.getItem('token'))
    config.headers.Authorization = `${localStorage.getItem('token')}`
    return config
}



$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost,
}