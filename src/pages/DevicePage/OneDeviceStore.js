import {makeAutoObservable} from "mobx";
import {giveDeviceById} from "../../http/UserApi";


export default class OneDeviceStore {
    constructor() {
        this.device = {
            "brandName": "",
            "device_infoResponseModels": [
                {
                    "description": "",
                    "id": null,
                    "title": ""
                }
            ],
            "id": null,
            "isName": true,
            "name": "",
            "pathFile": "",
            "price": "",
            "ratings": null,
            "typeName": ""
        }
        makeAutoObservable(this)
    }


    giveInfoDevice(id){
        giveDeviceById(id).then(response =>{
            this.device = response.data
        }).catch((err)=>{

        })
    }

    get Device(){
        return this.device
    }
}