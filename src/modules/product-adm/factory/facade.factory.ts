import ProducAdmFacade from "../facade/product-adme.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";

export default class ProductAdmFacadeFactory{
    static create(){
        const productRepostiry = new ProductRepository();
        const addProductUseCase = new AddProductUseCase(productRepostiry);
        const productAdmFacade = new ProducAdmFacade({addUsecase:addProductUseCase,stockUsecase:undefined});
        return productAdmFacade;
    }
}