import AggregateRoot from "../../@shared/domain/entities/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entities/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

import Address from "./Address.value-object";
import Product from "./product.entity";

type InvoiceProps = {
    id?: Id;
    name:string
    document:string
    address:Address
    items: Product[]
    createdAt?:Date;
    updatedAt?:Date;
}

export default class Invoice extends BaseEntity implements AggregateRoot{

    private _name:string
    private _document:string
    private _address: Address
    private _items: Product[]
    private _total:number


    constructor(props: InvoiceProps){
        super(props.id, props.createdAt, props.updatedAt)
        this._name = props.name
        this._document = props.document
        this._address = props.address
        this._items = props.items
    }

    validate(){
        if(this._name.length < 3){
            throw new Error('Invoice name must be at least 3 characters long')
        }
        if(this._document.length < 3){
            throw new Error('Invoice document must be at least 3 characters long')
        }
        if(this._items.length < 1){
            throw new Error('Invoice must have at least one item')
        }
    }

    get name():string{
        return this._name
    }

    get document():string{
        return this._document
    }

    get address():Address{
        return this._address
    }

    get items():Product[]{
        return this._items
    }

    get adderss():Address{
        return this._address
    }

    changeName(name:string):void{
        this._name = name
        this.validate()
    }

    changeDocument(document:string):void{
        this._document = document
        this.validate()
    }

    changeAddress(address:Address):void{
        this._address = address
        this.validate()
    }

    addItems(items:Product[]):void{
        this._items = [...this._items, ...items]
        this.validate()
    }



    get total():number{
        return this._items.reduce((total, item) => {
            return total + item.price
        }, 0)
    }
    





}