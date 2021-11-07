import {makeAutoObservable, toJS} from "mobx";
import {check, checkAdmin, getInfoAboutUser, getOrderItemsUser, login, refresh, registration} from "../http/UserApi";
import {editFio, editGender} from "../http/EditApi";

export default class UserStore {

    constructor() {
        this._isAuthUser = false
        this._isAuthAdmin = false
        this._orderItems = []
        this._user = {}
        this._personalInfo = {
            "fio": 'Null Null Null',
            "isMan": true,
            telephone_number: 'none'
        }

        this.isEditFio = false
        this.isEditGender = false

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

    get InfoProfile(){
        const obj = {}
        obj.name = this._personalInfo.fio.split(' ')
        obj.isMan = this._personalInfo.isMan
        obj.telephone_number = this._personalInfo.telephone_number

        return obj
    }

    requestFromProfileData(){
        return getInfoAboutUser().then((response)=>{
            debugger
            this._personalInfo = response.data
            return Promise.resolve(1)
        }).catch(({response})=>{
            return Promise.reject(response.data)
        })
    }

    doRegistaration(data, ){
        return registration(data)
            .then((response)=>{
                debugger
                return Promise.resolve()
            })
            .catch(()=>{
                debugger
                return Promise.reject()
            })
    }

    doAutorizate(telephoneNumber, password, taskInstance) {
        return login(telephoneNumber, password)
            .then((response) => {
                debugger
                localStorage.setItem('token', response.headers.jwtoken)
                localStorage.setItem('RefreshToken', response.headers.refreshtoken)
                if (response.data.info === 'ADMIN') {
                    this._isAuthAdmin = true
                }

                if (response.data.info === 'USER') {
                    this._isAuthUser = true
                }
                // this.checkAutorize() //Из за этого говна все поломалось
                return Promise.resolve(response)
            })
            .catch(() => {
                debugger
                return Promise.reject()
            })
    }

    checkRefresh(promise) {

        return refresh()
            .then((response)=> {
                debugger
                localStorage.setItem('token', response.headers.jwtoken)
                localStorage.setItem('RefreshToken', response.headers.refreshtoken)

                this.checkAutorize() //Из за этого говна все поломалось
                return Promise.resolve()
            })
            .catch((error)=>{
                debugger
                this.Out()
                return Promise.reject()
            })
    }

    checkAutorize() {

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

            }).catch(({r})=>{
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

    checkStatus(status, message=''){
        debugger
        if(status===400 && message==='Token was expired'){
            return this.checkRefresh()
        }

        if(status===403 || status===401){
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
                this.checkStatus(response.status, response.info)
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

    editFio(fio){
        debugger
        return editFio(fio).then(()=>{
            debugger
            this._personalInfo.fio = fio
            return Promise.resolve()
        }).catch(({response})=>{
            debugger
            return Promise.reject(response.data)
        })


    }

    editGender(gender){
        debugger
        return editGender(gender).then(()=>{
            debugger
            this._personalInfo.isMan = gender
            return Promise.resolve()
        }).catch(({response})=>{
            debugger
            return Promise.reject(response.data)
        })


    }


    setIsEditFio(bool) {
        this.isEditFio = bool
    }

    setIsEditGender(bool) {
        this.isEditGender = bool
    }

    get EditFio(){
        return this.isEditFio
    }

    get EditGender() {
        return this.isEditGender
    }



}