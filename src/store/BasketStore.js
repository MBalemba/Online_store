import {makeAutoObservable, toJS} from "mobx";


export default class BasketStore {


    constructor() {
        this._basketElems = {}
        this._countALl = 0
        makeAutoObservable(this)
    }


    toggleBasket(id) {
        debugger

        if (this._basketElems[id]) {
            if(this._basketElems[id].status){
                this._countALl -= 1
                this._basketElems[id] = {
                    count: 0,
                    status: false
                }
            } else {
                this._countALl += 1
                this._basketElems[id] = {
                    count: 1,
                    status: true
                }
            }
        } else {
            this._countALl += 1
            this._basketElems[id] = {
                count: 1,
                status: true
            }
        }
    }

    isBasketItem(id) {

        const obj = toJS(this._basketElems)
        if(obj[id]){
            return obj[id].status
        } else {
            return false
        }
    }

    get allCards (){
        return this._basketElems
    }

    get CountALl(){
        return this._countALl
    }

}