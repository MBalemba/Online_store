
import {makeAutoObservable, toJS} from "mobx";
import {getTypeBrand} from "../../../../http/UserApi";
import {deleteBrand} from "../../../../http/DeleteApi";




export default class StoreDeleteType {


    constructor() {
        this._brandInType = []
        this.selectedTypeId = null
        this.selectedBrandId = null
        this.brands = []
        this.selectedBrand = []
        makeAutoObservable(this)
    }

    returnToInitial(){
        this._brandInType = []
        this.selectedTypeId = null
        this.selectedBrandId = null
        this.brands = []
        this.selectedBrand = []
    }

    getBrandsInTypes(){
        return getTypeBrand().then((r) => {
            this._brandInType = r.data.filter((el)=> el.brands.length!== 0)
            return 1
        })
    }



    setSelectedType(id){
        this.selectedTypeId = id
        if(id === null){
            this.brands = []
        } else {
            this.brands = this._brandInType.find(el=> el.id === id).brands
        }
    }

    setSelectedBrand(id){
        this.selectedBrandId = id
    }

    deleteBrand(){


        return deleteBrand(this.selectedBrandId).then((response)=>{
            this.returnToInitial()
            return Promise.resolve()
        }).catch(()=>{return Promise.reject()})
    }

    get Brands(){
        return this.brands
    }

    get GetSelectedType(){
        return this.selectedTypeId
    }

    get GetSelectedTypeBrand(){
        return this.selectedBrandId
    }

    get ListBrands(){
        return toJS(this._brandInType);
    }

    get IsDisabled(){
        return ! Boolean(this.selectedBrandId && this.selectedTypeId)
    }

}

export const storeDeleteType = new StoreDeleteType()