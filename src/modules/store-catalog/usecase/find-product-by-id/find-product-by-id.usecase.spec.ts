
import Product from "../../domain/product.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import FindProductByIdUseCase from "./find-product-by-id.usecase";
import {  FindProductInputDto } from "./find-product-by-id.dto";

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Product 1 description",
    salesPrice: 10,
})

const MockRepository = ()=>{
    return {
        find: jest.fn().mockResolvedValue(Promise.resolve(product)),
        findAll: jest.fn(),
    }
}

describe("FindProductById use case test", () => {
    it ("should find product by id", async()=>{
        const productRepository = MockRepository()
        const useCase = new FindProductByIdUseCase(productRepository);
        const input:FindProductInputDto = {
            id:"1"
        }
        const output = await useCase.execute(input);

        expect(productRepository.find).toHaveBeenCalled()
        expect(output.id).toBe(product.id.id)
        expect(output.name).toBe(product.name)
        expect(output.description).toBe(product.description)
        expect(output.salesPrice).toBe(product.salesPrice)
    })
})