import {makeAutoObservable, toJS} from "mobx";
import {getDevices, getTypeBrand} from "../http/UserApi";


export default class DeviceStore {
    constructor() {

        this._brandInType = []
        this._devices = []
        this._isLoadDevices = false
        this._queryString = ''

        this._selectedBrands = {}

        this._amountOfAllDevices = 0
        this._pageCount = 1
        this._currentPage = 1
        this._limitPage = 4

        this._paginationTypeBorderValue = 15
        this._lengthMiddlePagination = 2

        makeAutoObservable(this)
    }


    setBrandInType(types) {
        getTypeBrand().then((r) => {

            this._brandInType = r.data
        })
    }

    setPropertyFromUri(getReadyQueryFromUri = ''){

        if(getReadyQueryFromUri!==''){
            const regexpPage = /page\s*(%20)*=\s*(%20)*\d+/
            const regexpBrand = /brand\s*(%20)*=(\s*(%20)*\w*,?)*/
            let pageQuery = getReadyQueryFromUri.match(regexpPage)? getReadyQueryFromUri.match(regexpPage)[0]: ''
            let brandQuery = getReadyQueryFromUri.match(regexpBrand)? getReadyQueryFromUri.match(regexpBrand)[0]: ''

            if(pageQuery){
                pageQuery = '&' + pageQuery.replace(/%20/g,'')
                this._currentPage =  Number(pageQuery.match(/\d+/)[0]) || 1
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
        let brands = '&brand='

        for (let i in this._selectedBrands){
            if(this._selectedBrands[i]){
                brands += (i +',')
            }
        }

        if(brands === '&brand=') {
            brands = ''
        }

        if(this._currentPage !== 1){
            return `${brands}&page=${this._currentPage}`
        } else {
            return `${brands}`
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
        this._limitPage = 12

    }



    setDevices(type) {
            return getDevices(`?type=${type}&limit=${this._limitPage}${this.createStrParamsForRequest()}`).then(
                (r)=>{
                    console.log('devices', r.data)
                    this._devices = r.data.listDTO
                    this._amountOfAllDevices = r.data.amountOfAllDevices
                    this._pageCount = Math.ceil(r.data.amountOfAllDevices / this._limitPage)
                    return Promise.resolve()
                }
            ).catch((r)=>{
                return Promise.reject(r)
            })
    }


    setSelectedBrands(obj) {
        this._selectedBrands = obj
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
        debugger
        if(this._pageCount>1){

            debugger

            if (this._pageCount< this._paginationTypeBorderValue){
                debugger
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