import {makeAutoObservable} from "mobx";
import {login} from "../http/UserApi";

export default class UserStore {
    constructor() {
        this._isAuth = true
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
        login(email, password)
            .then((response)=>{
                console.log(response)
                taskInstance.createTask('Успешно', 'Successful')
            })
            .catch(()=>{

            })
    }

}