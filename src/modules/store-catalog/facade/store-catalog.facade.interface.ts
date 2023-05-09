import FindStoreCatalogFacadeInputDto,
{
    FindAllStoreCatalogFacadeOutputDto,
    FindStoreCatalogFacadeOutputDto
}
    from "./DTO/store-catalog.facade.dto"


export default interface StoreCatalogFacadeInterface {
    find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto>
    findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>
}