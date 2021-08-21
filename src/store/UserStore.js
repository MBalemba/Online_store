import {makeAutoObservable, toJS} from "mobx";
import {check, checkAdmin, getOrderItemsUser, login, refresh} from "../http/UserApi";

export default class UserStore {

    constructor() {
        this._isAuthUser = false
        this._isAuthAdmin = false
        this._orderItems = []
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuthUser(bool) {
        this._isAuthUser = bool
    }

    setIsAuthAdmin(bool) {
        this._isAuthAdmin = bool
    }

    setUsers(user) {
        this._user = user
    }

    get isAuthUser() {
        return this._isAuthUser
    }

    get isAuthAdmin () {
        return this._isAuthAdmin
    }

    get OrderItems() {
        return toJS(this._orderItems)
    }

    get user() {
        return this._user
    }

    doAutorizate(email, password, taskInstance) {
        return login(email, password)
            .then((response) => {
                debugger
                localStorage.setItem('token', response.headers.jwtoken)
                localStorage.setItem('RefreshToken', response.headers.refreshtoken)
                this.checkAutorize()
                return Promise.resolve(response)
            })
            .catch(() => {
                return Promise.reject()
            })
    }

    checkRefresh(promise) {

        return refresh()
            .then((response)=> {
                debugger
                localStorage.setItem('token', response.headers.jwtoken)
                localStorage.setItem('RefreshToken', response.headers.refreshtoken)
                this.checkAutorize()
                return Promise.resolve()
            })
            .catch((error)=>{
                debugger
                localStorage.removeItem('token')
                localStorage.removeItem('RefreshToken')
                this._isAuthUser = false
                this._isAuthAdmin = false
                return Promise.reject()
            })
    }

    checkAutorize() {
        debugger
        if (localStorage.getItem('token')) {
            return check().then((r) => {
                debugger
                if (r.data.info === 'ADMIN') {
                    this._isAuthAdmin = true
                }

                if (r.data.info === 'USER') {
                    this._isAuthUser = true
                }

                return Promise.resolve()

            }).catch((r)=>{
                debugger
                this.checkRefresh().then(()=>{})
                console.log(r)
            }).finally(() => {
                debugger
                    return Promise.resolve()
                }
            )
        } else {
            return Promise.resolve()
        }
    }

    checkStatus(status){
        debugger
        if(status===468){
            return this.checkRefresh()
        }

        if(status===403){
            this.Out()
            return Promise.reject()
        }

        return Promise.reject()

    }

    getOrderItems(taskInstance) {
        debugger
        getOrderItemsUser()
            .then((response)=>{
                debugger
                this._orderItems = response.data
                taskInstance.createTask('Данные о заказе пришли', 'Success')
            })
            .catch(({response})=>{
                this.checkStatus()
                    .then(()=>{
                        this.getOrderItems(taskInstance)
                    })
                    .catch(()=>{
                        taskInstance.createTask(response.message, 'Danger')
                    })

            })
    }

    Out() {
        localStorage.removeItem('token')
        localStorage.removeItem('RefreshToken')
        this._isAuthUser = false
        this._isAuthAdmin = false
    }



}