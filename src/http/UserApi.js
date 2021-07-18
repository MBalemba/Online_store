import {$authHost, $host} from "./index";

export const registration = async (email, password) => {
    console.log(process.env.REACT_APP_API_URL)
    const response = await $host.post('user/registration', {email, password, role: 'ADMIN'})
    return response
}

export const login = async (email, password) => {
    const response = await $host.post('login', {email: email, password: password })
    return response
}

export const check = async () => {
    const response = await $authHost.post('user/check')
    return response
}

export const getTypeBrand = async () =>{
    const response = await $host.get('type/getAll')
    return response
}

export const giveDeviceServer = async (data) =>{
    const response = await $authHost.post('device/add', data)
    return response
}


export const postType = async (name) => {
    const response = await $authHost.post('device/add', name)
    return response
}
