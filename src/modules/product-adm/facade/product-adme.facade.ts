import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./DTO/Product-Adm.Facade.Dto";
import ProductAdmFacadeInterface from "./product-adm.facade.interface";

export interface UseCasesProps{
    addUsecase:UseCaseInterface;
    stockUsecase:UseCaseInterface;
}

export default class ProducAdmFacade implements ProductAdmFacadeInterface{

    private _addUsecase:UseCaseInterface;
    private _checkStockUsecase:UseCaseInterface;

    constructor(usecasesProps:UseCasesProps){
        this._addUsecase = usecasesProps.addUsecase;
        this._checkStockUsecase = usecasesProps.stockUsecase;
    }

    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        //caso o dto do facade seja diferente do dto do usecase, aqui é feita a conversão
        return this._addUsecase.execute(input);
    }
    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockUsecase.execute(input);
    }

}