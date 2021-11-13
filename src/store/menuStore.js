import {makeAutoObservable, toJS} from "mobx";
import {getDevices, getTypeBrand} from "../http/UserApi";


export default class MenuStore {
    constructor() {

        this._brandInType = []
        this._devices = []
        this._isLoadDevices = false
        this._queryString = ''

        this._selectedBrands = {}

        this._amountOfAllDevices = 0
        this._pageCount = 1
        this._currentPage = 1
        this._limitPage = 20

        this._paginationTypeBorderValue = 12
        this._lengthMiddlePagination = 2


        //server extreme price
        this._minPrice = 0
        this._maxPrice = 10000000

        //client prise chose
        this._clientMinPrice = null
        this._clientMaxPrice = null



        makeAutoObservable(this)
    }


    setBrandInType() {

        getTypeBrand().then((r) => {
            const arr = r.data.map(el =>{
                el.brands = el.brands.map(brandItem => ({...brandItem, isCheck: true}))
                return el
            })


            this._brandInType = r.data
        })
    }

    setPropertyFromUri(getReadyQueryFromUri = ''){
        getReadyQueryFromUri = decodeURI(getReadyQueryFromUri)
        if(getReadyQueryFromUri!==''){
            const regexpPage = /page\s*(%20)*=\s*(%20)*\d+/
            const regexpBrand = /brand\s*(%20)*=(\s*(%20)*[\w\p{sc=Cyrillic}]+,?)*/u
            const regexpMinPrice = /minPrice\s*(%20)*=\s*(%20)*\d+/
            const regexpMaxPrice = /maxPrice\s*(%20)*=\s*(%20)*\d+/

            let pageQuery = getReadyQueryFromUri.match(regexpPage)? getReadyQueryFromUri.match(regexpPage)[0]: ''
            let brandQuery = getReadyQueryFromUri.match(regexpBrand)? getReadyQueryFromUri.match(regexpBrand)[0]: ''
            let minPriceQuery =  getReadyQueryFromUri.match(regexpMinPrice)? getReadyQueryFromUri.match(regexpMinPrice)[0]: ''
            let maxPriceQuery=  getReadyQueryFromUri.match(regexpMaxPrice)? getReadyQueryFromUri.match(regexpMaxPrice)[0]: ''

            if(pageQuery){
                pageQuery = '&' + pageQuery.replace(/%20/g,'')
                this._currentPage =  Number(pageQuery.match(/\d+/)[0]) || 1
            }

            if (minPriceQuery){


                this._clientMinPrice = minPriceQuery.replace(/%20/g,'').replace(/\s/g, '').replace(/minPrice=/g,'').match(/\w+/g)[0]
                console.log(minPriceQuery.replace(/%20/g,'').replace(/\s/g, '').replace(/minPrice=/g,'').match(/\w+/g)[0])

                if(maxPriceQuery){

                    this._clientMaxPrice = maxPriceQuery.replace(/%20/g,'').replace(/\s/g, '').replace(/maxPrice=/g,'').match(/\w+/g)[0]
                    console.log(maxPriceQuery.replace(/%20/g,'').replace(/\s/g, '').replace(/maxPrice=/g,'').match(/\w+/g)[0])

                }
            }

            if(minPriceQuery){

            }

            if(maxPriceQuery){

            }

            if(brandQuery){
                let selectedBrands = {}
                let copyBrandQuery = brandQuery
                let arrOfBrands =  copyBrandQuery.replace(/(%20)/g,'').replace(/\s/g, '').replace(/brand=/g,'')
                arrOfBrands = arrOfBrands.match(/\w+/g)
                for(let k of arrOfBrands){
                    selectedBrands[k] = true
                }
                console.log('selectedBrands',selectedBrands)
                this._selectedBrands = {...selectedBrands}
                brandQuery ='&'+ brandQuery.replace(/%20/g,'')
            }

            // console.log('brandQuery&pageQuery: ' + `${brandQuery+pageQuery}` )
            // this._queryString = `${brandQuery+pageQuery}`

        } else {
            this._selectedBrands = {}
            this._currentPage = 1
        }


    }

    createStrParamsForRequest(){
        let strQ = '&brand='

        for (let i in this._selectedBrands){
            if(this._selectedBrands[i]){
                strQ += (i +',')
            }
        }

        if(strQ === '&brand=') {
            strQ = ''
        }


        if(this._clientMinPrice){
            strQ += `&minPrice=${this._clientMinPrice}`
            if(this._clientMaxPrice){
                strQ+= `&maxPrice=${this._clientMaxPrice}`
            }
        }



        if(this._currentPage !== 1){
            return `${strQ}&page=${this._currentPage}`
        } else {
            return `${strQ}`
        }


    }

    returnToInitialState(){
        this._brandInType = []
        this._devices = []
        this._isLoadDevices = false
        this._queryString = ''
        this._selectedBrands = {}
        this._amountOfAllDevices = 0
        this._pageCount = 1
        this._currentPage = 1
        this._limitPage = 18

        this._clientMinPrice = null
        this._clientMaxPrice = null

        this._minPrice = 0
        this._maxPrice = 1000000000


    }

    returnPriceRangeToInitial(){
        this._clientMinPrice = null
        this._clientMaxPrice = null

        this._minPrice = 0
        this._maxPrice = 1000000000
    }

    setDevices(type) {
        const a = this.createStrParamsForRequest()

        return getDevices(`?type=${type}&limit=${this._limitPage}${this.createStrParamsForRequest()}`).then(
            (r)=>{

                const dataMaxPrice = Number(r.data.maxPrice)
                const dataMinPrice = Number(r.data.minPrice)

                console.log('devices', r.data)
                this._devices = r.data.list

                // if(this._minPrice !== dataMinPrice || this._maxPrice !== dataMaxPrice){
                //     this._clientMinPrice = dataMinPrice
                //     this._clientMaxPrice = dataMaxPrice
                // }

                if(this._clientMinPrice=== null && this._clientMaxPrice===null){
                    this._clientMinPrice = dataMinPrice
                    this._clientMaxPrice = dataMaxPrice
                }

                if( this._clientMinPrice <= dataMinPrice ||  this._clientMinPrice >=dataMaxPrice ){
                    this._clientMinPrice = dataMinPrice
                }

                if(this._clientMaxPrice>=dataMaxPrice ||  this._clientMaxPrice <= dataMinPrice){
                    this._clientMaxPrice = dataMaxPrice
                }

                if(this._clientMaxPrice - this._clientMinPrice < (dataMaxPrice-dataMinPrice) / 8   ){
                    this._clientMinPrice = dataMinPrice
                    this._clientMaxPrice = dataMaxPrice
                }

                this._minPrice = dataMinPrice
                this._maxPrice = dataMaxPrice

                this._amountOfAllDevices = r.data.amountOfAllDevices
                this._pageCount = Math.ceil(r.data.amountOfAllDevices / this._limitPage)
                return Promise.resolve()
            }
        ).catch((r)=>{
            return Promise.reject(r.response)
        })
    }


    setSelectedBrands(obj) {
        this._selectedBrands = obj
    }

    setPriceQuery (obj) {
        this._clientMinPrice = obj.min
        this._clientMaxPrice =  obj.max
    }

    get ClientMinPrice(){
        return this._clientMinPrice
    }
    get ClientMaxPrice(){
        return this._clientMaxPrice
    }


    toggleStatusLoadDevices (bool) {
        this._isLoadDevices = bool
    }

    cleanSelectedBrands(){
        this._selectedBrands = {}
    }

    setCurrentPage(number) {
        this._currentPage = number
    }

    get BrandInType() {
        return toJS(this._brandInType)
    }

    get MinPrice(){
        return this._minPrice
    }
    get MaxPrice() {
        return this._maxPrice
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

    get PageCount() {
        return this._pageCount
    }

    get CurrentPage (){
        return this._currentPage
    }

    get QueryString (){
        return this._queryString
    }

    get PaginationTypeBorderValue(){
        return this._paginationTypeBorderValue
    }

    get LengthMiddlePagination(){
        return this._lengthMiddlePagination
    }

    get arrOfPage(){
        let arr =  []

        if(this._pageCount>1){



            if (this._pageCount< this._paginationTypeBorderValue){

                for (let i = 1; i<=this._pageCount; i++){
                    arr.push(i)
                }
            } else {

                if(this._currentPage - this._lengthMiddlePagination >= 1){
                    for (let i=0; i<=this._lengthMiddlePagination; i++){
                        arr = [this._currentPage-i, ...arr]
                    }

                } else {
                    for (let i = 1; i<=this._currentPage; i++){
                        arr.push(i)
                    }
                }

                if(this._currentPage+this._lengthMiddlePagination<= this._pageCount ){
                    for (let i=1; i<=this._lengthMiddlePagination; i++){
                        arr = [...arr, this._currentPage+i]
                    }
                } else {
                    for (let i = this._currentPage + 1; i<=this._pageCount ; i++){
                        arr.push(i)
                    }
                }
            }


        }


        console.log('arrOfPage', arr)
        return arr
    }

}