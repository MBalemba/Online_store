import {makeAutoObservable, toJS} from "mobx";
import {getAllOrders} from "../http/UserApi";


export default class OrderStore {


    constructor() {
        this._OrderInfo = []
        makeAutoObservable(this)
    }

    getOrderInfo(callbackUserCheck){
        getAllOrders()
            .then((response)=>{
                debugger
                this._OrderInfo = response.data
            })
            .catch(({response})=>{
                debugger
                callbackUserCheck(response.status)
            })
    }


    get OrderInfo(){
        return toJS(this._OrderInfo)
    }

}

export const orderStore = new OrderStore()

