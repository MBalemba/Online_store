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
        this._limitPage = 1

        makeAutoObservable(this)
    }


    setBrandInType(types) {
        getTypeBrand().then((r) => {
            this._brandInType = r.data
        })
    }

    setQueryString(type, getReadyQueryFromUri = ''){

        if(getReadyQueryFromUri!==''){
            const regexp = new RegExp("page=*\d");
            let pageNumber = getReadyQueryFromUri.match(regexp)

            console.log(pageNumber)


            this._queryString = `${getReadyQueryFromUri.slice(1)}`
        } else {
            let brands = '&brand = '

            for (let i in this._selectedBrands){
                if(this._selectedBrands[i]){
                    brands += (i +',')
                }
            }

            if(brands === '&brand = ') {
                brands = ''
            }

            if(this._currentPage !== 1){
                this._queryString = `${brands}&page=${this._currentPage}`
            } else {
                this._queryString = `${brands}`
            }





            console.log('_queryString',this._queryString)

            
        }

    }



    setDevices(type) {
            return getDevices(`?type=${type}&limit=${this._limitPage}${this._queryString}`).then(
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


    setSelectedBrands(name, bool) {
        this._selectedBrands[name] = bool
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

    get arrOfPage(){
        let arr =  []
        if(this._pageCount>1){
            if (this._pageCount<9){
                for (let i = 1; i<=this._pageCount; i++){
                    arr.push(i)
                }
            } else {

                    if(this._currentPage-4 > 1){
                        arr = [this._currentPage-4, this._currentPage-3, this._currentPage-2,this._currentPage-1, this._currentPage]
                    } else {
                        for (let i = 1; i<=this._currentPage; i++){
                            arr.push(i)
                        }
                    }

                    if(this._currentPage+4 < this._amountOfAllDevices){
                        arr = [...arr, this._currentPage+1,this._currentPage+2,this._currentPage+3,this._currentPage+4,]
                    } else{
                        for (let i = this._currentPage + 1; i<=this._amountOfAllDevices; i++){
                            arr.push(i)
                        }
                    }
             }


        }

        return arr
    }

}