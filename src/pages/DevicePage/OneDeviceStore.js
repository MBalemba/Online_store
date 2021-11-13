import {makeAutoObservable, toJS} from "mobx";
import {getImageByName, giveDeviceById} from "../../http/UserApi";
import {editDevice} from "../../http/EditApi";
import {deleteDevice} from "../../http/DeleteApi";


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
        this._isEditDeviceProcess = false
        this._isDeleteDeviceProcess = false

        makeAutoObservable(this)
    }

    toInitial(){
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
        this._isEditDeviceProcess = false
        this._isDeleteDeviceProcess = false
    }


    giveInfoDevice(id){
        return giveDeviceById(id).then(response =>{

            this.device = response.data
        }).catch(({response})=>{

            return Promise.reject(response)
        })
    }

    deleteCard(){
        this._isDeleteDeviceProcess = true
        return deleteDevice(this.device.id).then(()=>{
            this._isDeleteDeviceProcess = false
            return Promise.resolve(this.device.typeName)
        }).catch(({response})=>{
            return Promise.reject(response)
        })
    }

    editInfoDevice(newData, taskInstance){
        let lastData = toJS(this.device)
        let dataForm = new FormData();
        //
        // if(lastData.isName){
        //     getImageByName(lastData.pathFile).then((resp)=>{
        //
        //     }).catch((response)=>{
        //
        //     })
        // }
        delete lastData.pathFile
        delete lastData.isName




        const brand =  lastData.brandName
        const type = lastData.typeName

        newData = {...newData, brand, type}

        delete lastData.brandName
        delete lastData.typeName
        delete lastData.device_infoResponseModels
        newData = {...lastData, ...newData}


        dataForm.append('id', newData.id)
        dataForm.append('brand', newData.brand)
        dataForm.append('type', newData.type)
        dataForm.append('name', newData.name)
        dataForm.append('price', newData.price)
        dataForm.append('characteristic', JSON.stringify(newData.characteristic))


        if(newData.imgFile){
            dataForm.append('imgFile', newData.imgFile, newData.imgFile.name)
        }

        if(newData.imgRef){
            dataForm.append('imgRef', newData.imgRef)
        }


        this._isEditDeviceProcess = true
        return editDevice(dataForm).then((res)=>{
            setTimeout(()=>{this._isEditDeviceProcess = false}, 1000)
            return 1
        }).catch(({response})=>{
            return response
        })


    }

    get Device(){
        return this.device
    }

    get isEditDeviceProcess(){
        return this._isEditDeviceProcess
    }

    get isDeleteDeviceProcess(){
        return this._isDeleteDeviceProcess
    }
}