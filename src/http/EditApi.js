import {$authHost} from "./index";


export const editBrand = async (name, id) => {
    debugger
    const response = await $authHost.put('brand/edit', {
            id: id,
            name: name,
    })
    return response
}
export const editType = async (name, id) => {
    debugger
    const response = await $authHost.put('type/edit', {
            id: id,
            name: name,
    })
    return response
}

export const editDevice = async (obj) => {
    debugger
    const response = await $authHost.put('device/edit', obj)
    return response
}

export const editFio = async (fio) => {
    debugger
    const response = await $authHost.put(`user/changeFIO/${fio}`)
    return response
}

export const editGender = async (gender) => {
    debugger
    const response = await $authHost.put(`user/changeGender/${gender}`)
    return response
}




