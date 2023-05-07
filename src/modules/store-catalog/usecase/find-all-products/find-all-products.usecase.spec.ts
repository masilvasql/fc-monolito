import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import { FindAllProductsDto } from "./find-all-products.dto";
import FindAllProductsUseCase from "./find-all-products.usecase";



const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Product 1 description",
    salesPrice: 10,
})

const product2 = new Product({
    id: new Id("2"),
    name: "Product 2",
    description: "Product 2 description",
    salesPrice: 20,
})

const MockRepository = () => {
    return {
        findAll: jest.fn().mockResolvedValue(Promise.resolve([product, product2])),
        find: jest.fn().mockResolvedValue(Promise.resolve(product)),
    };
}



describe("FindAllProducts use case test", () => {

    it("should find all products", async () => {
        const productRepository = MockRepository();
        const findAllProductsUseCase = new FindAllProductsUseCase(productRepository)
        const output:FindAllProductsDto = await findAllProductsUseCase.execute()
        
        
        expect(productRepository.findAll).toHaveBeenCalled()
        expect(output.products[0].id).toBe(product.id.id)
        expect(output.products[0].name).toBe(product.name)
        expect(output.products[0].description).toBe(product.description)
        expect(output.products[0].salesPrice).toBe(product.salesPrice)

        expect(output.products[1].id).toBe(product2.id.id)
        expect(output.products[1].name).toBe(product2.name)
        expect(output.products[1].description).toBe(product2.description)
        expect(output.products[1].salesPrice).toBe(product2.salesPrice)
    })
    
})