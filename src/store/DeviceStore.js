import {makeAutoObservable, toJS} from "mobx";
import {getDevices, getTypeBrand} from "../http/UserApi";


export default class DeviceStore {
    constructor() {

        this._brandInType = []
        this._isLoadDevices = false
        this._queryString = ''
        this._selectedBrands = {}

        this._devices = [
            {
                id: 1,
                name: 'Iphone 12 pro',
                price: 25000,
                rating: 5,
                img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000'
            },
            {
                id: 2,
                name: 'Iphone 12 pro',
                price: 25000,
                rating: 5,
                img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000'
            },
            {
                id: 3,
                name: 'Iphone 12 pro',
                price: 25000,
                rating: 5,
                img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000'
            },
            {
                id: 4,
                name: 'Iphone 12 pro',
                price: 25000,
                rating: 5,
                img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000'
            },
            {
                id: 5,
                name: 'Iphone 12 pro',
                price: 25000,
                rating: 5,
                img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000'
            },
            {
                id: 6,
                name: 'Iphone 12 pro',
                price: 25000,
                rating: 5,
                img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000'
            },
            {
                id: 7,
                name: 'Iphone 12 pro',
                price: 25000,
                rating: 5,
                img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000'
            },
            {
                id: 8,
                name: 'Iphone 12 pro',
                price: 25000,
                rating: 5,
                img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=940&hei=1112&fmt=png-alpha&.v=1604021661000'
            },
        ]

        makeAutoObservable(this)
    }


    setBrandInType(types) {
        getTypeBrand().then((r) => {
            this._brandInType = r.data
        })
    }

    setQueryString(type, getReadyQueryFromUri =''){

        if(getReadyQueryFromUri!==''){

            this._queryString = `${getReadyQueryFromUri.slice(1)}`
            console.log(getReadyQueryFromUri.slice(1))

        } else {
            let string = 'brand = '

            for (let i in this._selectedBrands){
                if(this._selectedBrands[i]){
                    string += (i +',')
                }

            }

            if(string === 'brand = '){
                this._queryString = ``
                console.log(``)
            } else {
                this._queryString = `${string}`
                console.log(`&${string}`)
            }
            
        }

    }


    setDevices(type) {
            return getDevices(`?type=${type}&${this._queryString}`).then(
                (r)=>{
                    console.log(r.data)
                    this._devices = r.data
                    return Promise.resolve()
                }
            ).catch((r)=>{
                return Promise.reject(r)
            })
    }



    setSelectedBrands(name, bool) {
        this._selectedBrands[name] = bool
    }

    toggleStatusLoadDevices (bool) {
        this._isLoadDevices = bool
    }

    cleanSelectedBrands(){
        this._selectedBrands = {}
    }


    get BrandInType() {
        return toJS(this._brandInType)
    }

    get Devices() {
        return this._devices
    }


    get SelectedBrands() {
        return this._selectedBrands
    }

    get IsLoadDevices(){
        return this._isLoadDevices
    }

}