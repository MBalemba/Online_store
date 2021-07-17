import {action, makeAutoObservable} from "mobx";

//Выполняет функции записиданных перед отправкой на сервер
export default class CreateDeviceStore {

    constructor() {
        this._brand = null
        this._type = null
        this._name = null
        this._price = null
        this._img = null
        this._characteristic = [
            {
                nameProperty: '',
                description: '',
            }
        ]

        makeAutoObservable(this,{
            setBrand: action,
            setType: action,
            setName: action,
            setPrice: action,
            setImg: action,
        })

    }

    setBrand(brand) {
        this._brand = brand
    }

    setType(type) {
        this._type = type
    }

    setName(name) {
        this._name = name
    }

    setPrice(price) {
        this._price = price
    }

    setImg(file) {
        this._img = file
    }

    setCharacteristic() {

    }

    set() {

    }

    get Type() {
        return this._type
    }

    get Brand() {
        return this._brand
    }

    get Name() {
        return this._name
    }

    get Price() {
        return this._price
    }

    get Img() {
        return this._img
    }

    deleteAll() {
        this._brand = null
        this._type = null
        this._name = null
        this._price = null
        this._img = null
        this._characteristic = [
            {
                nameProperty: '',
                description: '',
            }
        ]
    }

}

window.store = new CreateDeviceStore()