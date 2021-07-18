import {action, makeAutoObservable} from "mobx";
import {giveDeviceServer} from "../http/UserApi";

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

        makeAutoObservable(this, {
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
        this._characteristic = []
    }

    IsGetReadyToRequest() {
        return this._brand && this._type && this._name && this._price && this._img
    }

    giveSomeDataToServer(characteristic, taskStore) {
        let data = new FormData();
        data.append('brand', this._brand)
        data.append('type', this._type)
        data.append('name', this._name)
        data.append('price', this._price)
        data.append('img', this._img, this._img.name)
        if (characteristic) {
            data.append('characteristic', this._characteristic)
        }

        giveDeviceServer(data)
            .then((response) => {
                (taskStore.createTask('Успешно', 'Success'))
            })
            .catch((e) => {
                taskStore.createTask('Ошибка отправки данных', 'Danger')
            })

    }



}

window.store = new CreateDeviceStore()