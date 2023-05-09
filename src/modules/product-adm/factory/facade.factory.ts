import ProducAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";

export default class ProductAdmFacadeFactory{
    static create(){
        const productRepostiry = new ProductRepository();
        const addProductUseCase = new AddProductUseCase(productRepostiry);
        const checkStockUseCase = new CheckStockUseCase(productRepostiry)
        const productAdmFacade = new ProducAdmFacade({
            addUsecase:addProductUseCase,
            stockUsecase:checkStockUseCase
        });
        return productAdmFacade;
    }
}