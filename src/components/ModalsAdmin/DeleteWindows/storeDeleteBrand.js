
import {makeAutoObservable, toJS} from "mobx";
import {getTypeBrand} from "../../../http/UserApi";
import {deleteBrand, deleteType} from "../../../http/DeleteApi";
import {editBrand, editType} from "../../../http/EditApi";




export default class StoreDeleteBrand {


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
            this._brandInType = r.data
            return 1
        })
    }



    setSelectedType(id){
        this.selectedTypeId = id
        this.selectedBrandId = null
        if(id === null){
            this.brands = []
        } else {
            this.brands = this._brandInType.find(el=> el.id === id).brands
        }
    }

    setSelectedBrand(id){
        this.selectedBrandId = id
    }

    editBrand(newValue){


        return editBrand(newValue, this.selectedBrandId).then(()=>{
            this.returnToInitial()
            return Promise.resolve()
        }).catch(()=>{
            return Promise.reject()
        })

    }

    deleteBrand(){


        return deleteBrand(this.selectedBrandId).then((response)=>{
            this.returnToInitial()
            return Promise.resolve()
        }).catch(()=>{return Promise.reject()})
    }

    editType(newValue) {
        return editType(newValue, this.selectedTypeId).then(()=>{
            this.returnToInitial()
            return Promise.resolve()
        }).catch(()=>{
            return Promise.reject()
        })
    }

    deleteType() {

        return deleteType(this.selectedTypeId).then((response)=>{
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

    get GiveNameSelectedBrand(){
        return this.brands.find((el)=> el.id === this.selectedBrandId)?.name
    }

    get GiveNameSelectedType() {
        return this._brandInType.find((el)=> el.id === this.selectedTypeId)?.name
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

export const store =  new StoreDeleteBrand()
