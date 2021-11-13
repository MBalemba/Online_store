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
        this._link = null
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

    setLink(link) {
        this._link = link
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

    get Link() {
        return this._link
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
        return this._brand && this._type && this._name && this._price && (this._img || this._link)
    }

    giveSomeDataToServer(characteristic, taskStore) {
        let data = new FormData();
        data.append('brand', this._brand)
        data.append('type', this._type)
        data.append('name', this._name.trim())
        data.append('price', this._price)
        if(this._img){
            data.append('imgFile', this._img, this._img.name)
        }
        if(this._link){
            data.append('imgRef', this._link)
        }

        if (characteristic) {
            data.append('characteristic', JSON.stringify(characteristic))
        }

        return giveDeviceServer(data)
            .then((response) => {

                (taskStore.createTask('Успешно', 'Success'))
                return Promise.resolve()
            })
            .catch((e) => {

                if(e.response.status!== 500 && e.response.data.info){
                    taskStore.createTask(e.response.data.info, 'Danger')
                }
                return Promise.reject(e.response)
            })
    }

}

window.store = new CreateDeviceStore()