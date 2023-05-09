import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import FindStoreCatalogFacadeInputDto, { FindStoreCatalogFacadeOutputDto, FindAllStoreCatalogFacadeOutputDto } from "./DTO/store-catalog.facade.dto";
import StoreCatalogFacadeInterface from "./store-catalog.facade.interface";

export interface UseCasesProps{
    findUsecase:UseCaseInterface
    findAllUsecase:UseCaseInterface
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface{

    private _findUsecase:UseCaseInterface;
    private _findAllUsecase:UseCaseInterface;

    constructor(usecasesProps:UseCasesProps){
        this._findUsecase = usecasesProps.findUsecase;
        this._findAllUsecase = usecasesProps.findAllUsecase;
    }

    async find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
        return await this._findUsecase.execute(id);
    }
    
    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
        return await this._findAllUsecase.execute(null);
    }

}