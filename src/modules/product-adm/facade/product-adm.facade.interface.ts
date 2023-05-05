import { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./DTO/Product-Adm.Facade.Dto"

export default interface ProductAdmFacadeInterface {
    addProduct(input:AddProductFacadeInputDto): Promise<void>
    checkStock(inpit:CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto>
}