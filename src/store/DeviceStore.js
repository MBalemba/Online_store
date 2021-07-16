import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {

        this._brandInType = [
            {
                name: 'Холодильник',
                brandDTOS: [
                    'Samsung',
                    'Apple',
                    'Asus',
                ]
            },
            {
                name: 'Смартфон',
                brandDTOS: [
                    'Samsung',
                    'Apple',
                    'Asus',
                    'Lenovo',
                ]
            },
            {
                name: 'Ноутбуки',
                brandDTOS: [
                    'Samsung',
                    'Apple',
                    'Asus',
                    'Lenovo',
                ]
            },
            {
                name: 'Телевизоры',
                brandDTOS: [
                    'Samsung',
                    'Apple',
                    'Asus',
                    'Lenovo',
                ]
            }

        ]

        this._types = [
            {id: 1, name: 'Холодильник'},
            {id: 2, name: 'Смартфон'},
            {id: 3, name: 'Ноутбуки'},
            {id: 4, name: 'Телевизоры'},
        ]

        this._brands = [
            {id: 1, name: 'Samsung'},
            {id: 2, name: 'Apple'},
            {id: 3, name: 'Lenovo'},
            {id: 4, name: 'Asus'},
        ]

        this._devices = [
            {id: 1, name: 'Iphone 12 pro', price: 25000 , rating: 5, img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000'},
            {id: 2, name: 'Iphone 12 pro', price: 25000 , rating: 5, img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000'},
            {id: 3, name: 'Iphone 12 pro', price: 25000 , rating: 5, img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000'},
            {id: 4, name: 'Iphone 12 pro', price: 25000 , rating: 5, img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000'},
            {id: 5, name: 'Iphone 12 pro', price: 25000 , rating: 5, img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000'},
            {id: 6, name: 'Iphone 12 pro', price: 25000 , rating: 5, img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000'},
            {id: 7, name: 'Iphone 12 pro', price: 25000 , rating: 5, img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000'},
            {id: 8, name: 'Iphone 12 pro', price: 25000 , rating: 5, img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000'},
        ]

        this._selectedType = {}
        this._selectedBrand = {}
        makeAutoObservable(this)
    }

    setBrandInType(massive){
        this._brandInType = massive
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

    setSelectedType(type) {
        this._selectedType = type
    }

    setSelectedBrand(id) {
        this._selectedBrand = id
    }

    get Types() {
        return this._types
    }

    get Brands() {
        return this._brands
    }

    get BrandInType() {
        return this._brandInType
    }

    get Devices() {
        return this._devices
    }

    get SelectedType(){
        return this._selectedType
    }

    get SelectedBrand(){
        return this._selectedBrand
    }

}