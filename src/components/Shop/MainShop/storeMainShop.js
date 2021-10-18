import {makeAutoObservable} from "mobx";
import {getDevices_24} from "../../../http/UserApi";


export default class StoreMainShow {
    constructor() {
        this.devices = []
        makeAutoObservable(this)
    }




}