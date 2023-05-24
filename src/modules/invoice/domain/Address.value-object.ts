import ValueObject from "../../@shared/domain/value-object/value-object.interface";

export default class Address implements ValueObject {
    _street: string;
    _number: string;
    _complement: string;
    _city: string;
    _state: string;
    _zipCode: string;

    constructor(street: string, number: string, complement: string, city: string, state: string, zipCode: string) {
        this._street = street;
        this._number = number;
        this._complement = complement;
        this._city = city;
        this._state = state;
        this._zipCode = zipCode;
        this.validate();
    }

    get street(): string {
        return this._street;
    }

    get number(): string {
        return this._number;
    }

    get complement(): string {
        return this._complement;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get zipCode(): string {
        return this._zipCode;
    }

    changeStreet(street: string): void {
        this._street = street;
        this.validate();
    }

    changeNumber(number: string): void {
        this._number = number;
        this.validate();
    }

    changeComplement(complement: string): void {
        this._complement = complement;
        this.validate();
    }

    changeCity(city: string): void {
        this._city = city;
        this.validate();
    }

    changeState(state: string): void {
        this._state = state;
        this.validate();
    }

    changeZipCode(zipCode: string): void {
        this._zipCode = zipCode;
        this.validate();
    }

    validate(){
        if(!this._street){
            throw new Error("Street is required")
        }
        if(!this._number){
            throw new Error("Number is required")
        }
        if(!this._city){
            throw new Error("City is required")
        }
        if(!this._state){
            throw new Error("State is required")
        }
        if(!this._zipCode){
            throw new Error("Zip code is required")
        }
    }

}