import {$authHost, $authHostRefresh, $host} from "./index";


export const registration = async (obj) => {
    console.log(process.env.REACT_APP_API_URL)
        const response = await $host.post('user/registration', obj)

        return response
}

export const login = async (telephoneNumber, password) => {
    const response = await $host.post('login', {telephoneNumber: telephoneNumber, password: password})

    return response
}

export const check = async () => {
    const response = await $authHost.get('user/checkRole')
    return response
}

export const refresh = async () => {
    const response = await $authHostRefresh.post('refreshToken')
    return response
}


export const getTypeBrand = async () => {
    const response = await $host.get('type/getAll')

    return response
}

export const getDevices = async (query) => {
    console.log('query', query)
    const response = await $host.get('device/getByParams' + query)
    return response
}

export const getDevices_24 = async ()=>{
    const response = await $host.get('/device/getTopDevices')
    return response
}

export const giveDeviceServer = async (data) => {
    const response = await $authHost.post('device/add', data)
    return response
}

export const giveDeviceById = async (id) => {
    const response = await $host.get(`device/getById/${id}`)

    return response
}


export const postType = async (name) => {
    const response = await $authHost.post('type/add', {name: name})
    return response
}

export const postBrand = async (data) => {
    const response = await $authHost.post('brand/add', data)
    return response
}


export const AddOrderInfoToServer = async (data) => {

    const response = await $authHost.post('order/add', data)
    return response
}

export const getAllOrders = async () => {
    const response = await $authHost.get('order/getAll')
    return response
}

export const getImageByName = async (name) => {

    const response = await $authHost.get(process.env.REACT_APP_API_URL + 'takeImage/'+ name)
    return response
}

export const codeConfirmation = async (obj) => {

    const response = await $host.put('/user/codeConfirmation', obj)

    return response
}

export const changeOrderStatus = async (data) => {

    const response = await $authHost.put('order/changeStatusOfOrder', data)
    console.log(response.data)

    return response
}

export const getOrderItemsUser = async () => {
    const response = await $authHost.get('/order/getAllByUser')
    return response
}

export const getInfoAboutUser = async () => {
    const response = await $authHost.get ('/user/getInfoAboutUser')
    return response
}



