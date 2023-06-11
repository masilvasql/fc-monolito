import { Sequelize } from "sequelize-typescript";
import {ProductModel} from "./product.model";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([ProductModel]);
        await sequelize.sync({ force: true });

    })

    afterEach(async () => {
        sequelize.close()
    })

    it("should find all products", async()=>{
        const product = await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 10,
        })
        const product2 = await ProductModel.create({
            id: "2",
            name: "Product 2",
            description: "Product 2 description",
            salesPrice: 20,
        })
        
        const productRepository = new ProductRepository()
        const products = await productRepository.findAll()

        expect(products.length).toBe(2)
        expect(products[0].id.id).toBe(product.id)
        expect(products[0].name).toBe(product.name)
        expect(products[0].description).toBe(product.description)
        expect(products[0].salesPrice).toBe(product.salesPrice)
        
        expect(products[1].id.id).toBe(product2.id)
        expect(products[1].name).toBe(product2.name)
        expect(products[1].description).toBe(product2.description)
        expect(products[1].salesPrice).toBe(product2.salesPrice)
    })

    it("should find product by id", async()=>{
        const product = await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 10,
        })
        
        const productRepository = new ProductRepository()
        const output = await productRepository.find(product.id)

        expect(output.id.id).toBe(product.id)
        expect(output.name).toBe(product.name)
        expect(output.description).toBe(product.description)
        expect(output.salesPrice).toBe(product.salesPrice)
    })
})