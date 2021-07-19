import {makeAutoObservable} from "mobx";
import {check, login} from "../http/UserApi";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUsers(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }

    doAutorizate(email, password, taskInstance) {
        return  login(email, password)
            .then((response)=>{
                localStorage.setItem('token', response.headers.authorization)
                this._isAuth = true
                return Promise.resolve(response)
            })
            .catch(()=>{
                return Promise.reject()
            })
    }

    checkAutorize(){
        if(localStorage.getItem('token')){
            return check().then(() => {
                this.setIsAuth(true)
                return Promise.resolve()
            }).finally(()=>{
                    return Promise.resolve()})
        } else {
            return Promise.resolve()
        }
    }

    Out(){
        localStorage.removeItem('token')
        this._isAuth = false
    }

}