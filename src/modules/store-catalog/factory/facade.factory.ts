import StoreCatalogFacade from "../facade/store-catalog.facade";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductByIdUseCase from "../usecase/find-product-by-id/find-product-by-id.usecase";

export default class StoreCatalogFacadeFactory{
    static create():StoreCatalogFacade{
        const productRepository = new ProductRepository();
        const findUseCase = new FindProductByIdUseCase(productRepository);
        const findAllUseCase = new FindAllProductsUseCase(productRepository);
        const facade =   new StoreCatalogFacade({findUsecase:findUseCase, findAllUsecase:findAllUseCase});
        return facade;
    }
}