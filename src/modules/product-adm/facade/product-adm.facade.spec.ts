import { Sequelize } from "sequelize-typescript";
import  ProductModel  from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProducAdmFacade from "./product-adme.facade";

describe("ProductAdmFacade Test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
        await sequelize.addModels([ProductModel])
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a product", async () => {

        const productRepostiry = new ProductRepository();
        const addProductUseCase = new AddProductUseCase(productRepostiry);
        const productFacade = new ProducAdmFacade({ addUsecase: addProductUseCase, stockUsecase: undefined });

        const input = {
            id: "1",
            name: "product 1",
            description: "product 1 description",
            purchasePrice: 10,
            stock: 10
        }

        await productFacade.addProduct(input);

        const product = await ProductModel.findOne({ where: { id: input.id } });

        
        expect(product).not.toBeNull();
        expect(product.id).toBe(input.id);
        expect(product.name).toBe(input.name);
        expect(product.description).toBe(input.description);
        expect(product.purchasePrice).toBe(input.purchasePrice);
        expect(product.stock).toBe(input.stock);


    })
})