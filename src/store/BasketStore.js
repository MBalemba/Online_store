import {makeAutoObservable, toJS} from "mobx";
import {AddOrderInfoToServer} from "../http/UserApi";


export default class BasketStore {


    constructor() {
        this._basketElems = []
        this._countALL = 0
        makeAutoObservable(this)
    }


    toggleBasket(id, price) {


        if(id===null){
            return ''
        }

        const isElemWithIdExist = this._basketElems.some((el) => {
            return el.id === id
        })



        if (isElemWithIdExist) {
            const elem = this._basketElems.find(el => el.id === id)

            this._countALL -= 1 * elem.count
            this._basketElems = this._basketElems.filter(el => el.id !== id)

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

    SaveInCookie() {
        localStorage.setItem('basket', JSON.stringify(toJS(this._basketElems)))
    }

    SetFromCookie() {

        if (localStorage.getItem('basket')) {
            this._basketElems = JSON.parse(localStorage.getItem('basket'))
            this._basketElems.forEach((el) => {
                this._countALL += el.count
            })
            console.log(JSON.parse(localStorage.getItem('basket')))
        }
    }

    returnInitialState() {
        this._basketElems = []
        this._countALL = 0
        localStorage.setItem('basket', JSON.stringify(toJS(this._basketElems)))
    }

    formAnOrder(StatusCheckUser, taskStore) {

        const orderItems = this._basketElems.map((el) => ({id: el.id, amount: el.count}))
        const createData = {
            totalSumCheck: this.AllPrice,
            orderItems: orderItems
        }

        AddOrderInfoToServer(createData)
            .then((response) => {
                // this.returnInitialState()
                taskStore.createTask('Заказ сделан', 'Success')
            })
            .catch(({response}) => {
                StatusCheckUser(response.status, response.info)
                    .then(() => {
                        // this.returnInitialState()
                        taskStore.createTask('Заказ сделан', 'Success')
                    })
                    .catch(()=>{
                        taskStore.createTask('Не удается сделать заказ', 'Danger')
                    })
            })
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
            priceSum += Number(el.price) * Number(el.count)
        })

        return priceSum
    }


}