import Id from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
    id?: string;
    name:string
    price:number
}

export default class Product {

    private _id:Id
    private _name:string
    private _price:number

    constructor(props: ProductProps){
        this._id = props.id ? new Id(props.id) : new Id()
        this._name = props.name
        this._price = props.price
        this.validate()
    }

    get id():Id{
        return this._id
    }

    get name():string{
        return this._name
    }

    get price():number{
        return this._price
    }

    changeName(name:string):void{
        this._name = name
        this.validate()
    }

    changePrice(price:number):void{
        this._price = price
        this.validate()
    }

    validate(){
        if(this._name.length < 3){
            throw new Error('Product name must be at least 3 characters long')
        }
        if(this._price <= 0){
            throw new Error('Product price must be greater than 0')
        }
    }

}