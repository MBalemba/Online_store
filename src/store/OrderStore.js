import {makeAutoObservable, toJS} from "mobx";
import {changeOrderStatus, getAllOrders} from "../http/UserApi";

const emptyFunc = () =>{

}

export default class OrderStore {


    constructor() {
        this._OrderInfo = []
        this._isFetching = true
        makeAutoObservable(this)
    }

    getOrderInfo(callbackUserCheck) {
        this._isFetching = true

        getAllOrders()
            .then((response) => {
                this._isFetching = false
                debugger
                this._OrderInfo = response.data
            })
            .catch(({response}) => {
                this._isFetching = false
                debugger
                callbackUserCheck(response.status, response.info).then(() => {
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
            .catch(({response}) => {
                debugger

                userCheckCallback(response.status, response.info).then(() => {
                    debugger
                    this.changeOrderStatus(userCheckCallback, taskInstance, callbackChangeStatus)
                }).catch(() => {
                    debugger
                    if (response.data.message) {
                        taskInstance.createTask(response.data.message, 'Danger')
                    }

                    if (response.data.info) {
                        taskInstance.createTask(response.data.info, 'Danger')
                    }


                })
            })
    }


    get FetchingStatus(){
        return this._isFetching
    }


    get OrderInfo() {
        return toJS(this._OrderInfo)
    }


}

export const orderStore = new OrderStore()

