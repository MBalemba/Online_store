import {$authHost} from "./index";


export const deleteBrand = async (id) => {
    const response = await $authHost.delete('brand/delete', {
        data: {
            id: id
        }
    })
    return response
}