import {makeAutoObservable, toJS} from "mobx";
import {changeOrderStatus, getAllOrders} from "../http/UserApi";

const emptyFunc = () =>{

}

export default class OrderStore {


    constructor() {
        this._OrderInfo = []
        makeAutoObservable(this)
    }

    getOrderInfo(callbackUserCheck) {
        getAllOrders()
            .then((response) => {
                debugger
                this._OrderInfo = response.data
            })
            .catch(({response}) => {
                debugger
                callbackUserCheck(response.status).then(() => {
                    this.getOrderInfo()
                })
            })
    }


    changeOrderStatus(data = {}, userCheckCallback = emptyFunc, taskInstance = emptyFunc, callbackChangeStatus = emptyFunc) {
        changeOrderStatus(data)
            .then((response) => {
                debugger
                taskInstance.createTask('Статус успешно изменен', 'Success')
                callbackChangeStatus()
            })
            .catch(({data}) => {
                debugger
                //
                // userCheckCallback(response.status).then(() => {
                //     debugger
                //
                //     this.changeOrderStatus(userCheckCallback, taskInstance, callbackChangeStatus)
                // }).catch(() => {
                //     debugger
                //     if (response.data.message) {
                //         taskInstance.createTask(response.data.message, 'Danger')
                //     }
                //
                //     if (response.data.info) {
                //         taskInstance.createTask(response.data.info, 'Danger')
                //     }
                //
                //
                // })
            })
    }


    get OrderInfo() {
        return toJS(this._OrderInfo)
    }


}

export const orderStore = new OrderStore()

