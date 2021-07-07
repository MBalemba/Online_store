import {makeAutoObservable} from "mobx";

export default class Userstore {
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }
}