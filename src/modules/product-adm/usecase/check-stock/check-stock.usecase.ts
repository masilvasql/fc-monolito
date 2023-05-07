import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { CheckStockInputDto, CheckStockOutputDto } from "./check-stock.dto";

export default class CheckStockUseCase implements UseCaseInterface{
    private productRepository: ProductGateway;

    constructor(productRepository: ProductGateway){
        this.productRepository = productRepository;
    }

    async execute(input: CheckStockInputDto):Promise<CheckStockOutputDto>{
        const product = await this.productRepository.find(input.productId)
        const output = {
            productId: product.id.id,
            stock: product.stock
        }
        return output;
    }
}