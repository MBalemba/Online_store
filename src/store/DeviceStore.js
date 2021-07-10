import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._type = [
            {id: 1, name: 'Холодильник'},
            {id: 2, name: 'Смартфон'}
        ]
        this._brands = [
            {id: 1, name: 'Samsung'},
            {id: 2, name: 'Apple'},
        ]
        this._devices = [
            {id: 1, name: 'Iphone 12 pro', price: 25000 , rating: 5, img: ''},
            {id: 2, name: 'Iphone 12 pro', price: 25000 , rating: 5, img: ''},
            {id: 3, name: 'Iphone 12 pro', price: 25000 , rating: 5, img: ''},
            {id: 4, name: 'Iphone 12 pro', price: 25000 , rating: 5, img: ''},
        ]
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }

    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }

    get Types() {
        return this._types
    }

    get Brands() {
        return this._brands
    }
    get Devices() {
        return this._devices
    }

}