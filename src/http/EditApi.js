import {$authHost} from "./index";


export const editBrand = async (name, id) => {

    const response = await $authHost.put('brand/edit', {
            id: id,
            name: name,
    })
    return response
}
export const editType = async (name, id) => {

    const response = await $authHost.put('type/edit', {
            id: id,
            name: name,
    })
    return response
}

export const editDevice = async (obj) => {

    const response = await $authHost.put('device/edit', obj)
    return response
}

export const editFio = async (fio) => {

    const response = await $authHost.put(`user/changeFIO/${fio}`)
    return response
}

export const editGender = async (gender) => {

    const response = await $authHost.put(`user/changeGender/${gender}`)
    return response
}




