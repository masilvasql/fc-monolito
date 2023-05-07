import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindProductInputDto, FindProductOutputDto } from "./find-product-by-id.dto";

export default class FindProductByIdUseCase implements UseCaseInterface{
    
    private productRepository:ProductGateway

    constructor(productRepository:ProductGateway){
        this.productRepository = productRepository
    }
    
    async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
        const product = await this.productRepository.find(input.id)

        const output:FindProductOutputDto={
            id:product.id.id,
            description:product.description,
            name:product.name,
            salesPrice:product.salesPrice
        }
        return output
    }

}