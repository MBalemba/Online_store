import {action, makeAutoObservable} from "mobx";
import {getTypeBrand, giveDeviceServer} from "../http/UserApi";

//Выполняет функции записиданных перед отправкой на сервер
export default class MainPageStore {

    constructor() {
        this._brand = []


        makeAutoObservable(this)

    }

    setBrandInType() {
        debugger
        return getTypeBrand().then((r) => {
            debugger
            this._brand = r.data
            return 1
        })
    }

    get topCategory() {
        const arr = []

        debugger
        for (let i = 0; i < 6; i++) {

            if (this._brand[i]) {
                arr.push(this._brand[i].name)
            } else {
                arr.push('неопределено')
            }
        }

        return arr
    }

    get () {
        return this._brand.length===0
    }


}