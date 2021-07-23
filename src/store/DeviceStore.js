import {makeAutoObservable, toJS} from "mobx";
import {getDevices, getTypeBrand} from "../http/UserApi";


export default class DeviceStore {
    constructor() {

        this._brandInType = []
        this._isLoadDevices = false
        this._queryString = ''
        this._selectedBrands = {}

        this._devices = []

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