import {action, makeAutoObservable, toJS} from "mobx";
import {getDevices_24, getTypeBrand, giveDeviceServer} from "../http/UserApi";

//Выполняет функции записиданных перед отправкой на сервер
export default class MainPageStore {

    constructor() {
        this._brand = []
        this.devices = []

        makeAutoObservable(this)

    }

    setBrandInType() {

        return getTypeBrand().then((r) => {

            this._brand = r.data
            return 1
        })
    }

    doRequestFromDevices(){
        getDevices_24().then((response)=>{

            console.log(response)
            this.devices = response.data
        })
            .catch((er)=>{

            })
    }

    get giveDevices(){
        let arr = [[]]
        let counter = 0


        toJS(this.devices).forEach((el,index)=>{

            if(index % 4 === 0 && index!== 0){
                counter++;
                arr.push([])
            }


            arr[counter].push(el)

        })
        return toJS(arr)
    }

    get topCategory() {
        const arr = []
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