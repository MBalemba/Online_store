import {$authHost} from "./index";


export const deleteBrand = async (id) => {
    const response = await $authHost.delete('brand/delete', {
        data: {
            id: id
        }
    })
    return response
}

export const deleteType = async (id) => {
    const response = await $authHost.delete('type/delete', {
        data: {
            id: id
        }
    })
}

export const deleteDevice = async (id) => {
    const response = await $authHost.delete('device/delete', {
        data: {
            id: id
        }
    })
}