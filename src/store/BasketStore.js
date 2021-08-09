import {makeAutoObservable, toJS} from "mobx";


export default class BasketStore {


    constructor() {
        this._basketElems = []
        this._countALL = 0
        makeAutoObservable(this)
    }


    toggleBasket(id, price) {
        debugger
        const isElemWithIdExist = this._basketElems.some((el) => {
            return el.id === id
        })

        debugger

        if (isElemWithIdExist) {
            this._basketElems = this._basketElems.filter(el => el.id !== id)
            this._countALL -= 1
        } else {
            this._basketElems.push({id: id, count: 1, price: price})
            this._countALL += 1
        }
    }

    decrease(id) {
        this._basketElems = this._basketElems.map((el) => {
            if (el.id === id) {
                if (el.count - 1 !== 0) {
                    this._countALL -= 1
                    return {...el, count: el.count - 1}
                } else return el
            }
            return el
        })
    }

    increase(id) {
        this._basketElems = this._basketElems.map((el) => {
            if (el.id === id) {
                if (el.count + 1 !== 11) {
                    this._countALL += 1
                    return {...el, count: el.count + 1}
                } else return el
            }
            return el
        })
    }

    isBasketItem(id) {

        const isElemWithIdExist = this._basketElems.some((el) => {
            return el.id === id
        })

        return isElemWithIdExist
    }

    get allCards() {
        return this._basketElems
    }

    get CountALl() {
        return this._countALL
    }

    get AllPrice() {
        let priceSum = 0

        this._basketElems.forEach((el) => {
            priceSum += Number(el.price)*Number(el.count)
        })


        return priceSum
    }


}