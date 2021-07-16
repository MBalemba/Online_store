import {$authHost, $host} from "./index";

export const registration = async (email, password) => {
    console.log(process.env.REACT_APP_API_URL)
    const response = await $host.post('api/auth/registration', {email, password, role: 'ADMIN'})
    return response
}

export const login = async (email, password) => {
    const response = await $host.post('api/auth/registration', {email, password})
    return response
}

export const check = async (email, password) => {
    const response = await $host.post('api/auth/registration')
    return response
}

export const getTypeBrand = async () =>{
    const response = await $host.get('type/getAll')
    return response
}
