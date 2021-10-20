import {$authHost} from "./index";


export const editBrand = async (name, id) => {
    debugger
    const response = await $authHost.put('brand/edit', {
            id: id,
            name: name,
    })
    return response
}