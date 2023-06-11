import { Sequelize } from "sequelize-typescript"
import {ProductModel} from "../repository/product.model"
import ProductRepository from "../repository/product.repository";
import FindProductByIdUseCase from "../usecase/find-product-by-id/find-product-by-id.usecase";
import StoreCatalogFacade from "./store-catalog.facade";
import StoreCatalogFacadeFactory from "../factory/facade.factory";

describe("StoreCatalogFacade Test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should find a product by id", async () => {
        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 10
        })

        const facade = StoreCatalogFacadeFactory.create();
        const product = await facade.find({ id: "1" });

        expect(product).not.toBeNull();
        expect(product.id).toBe("1");
        expect(product.name).toBe("Product 1");
        expect(product.description).toBe("Product 1 description");
        expect(product.salesPrice).toBe(10);

    })

    it("should find all products", async () => {
        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 10
        })

        await ProductModel.create({
            id: "2",
            name: "Product 2",
            description: "Product 2 description",
            salesPrice: 20
        })

        const facade = StoreCatalogFacadeFactory.create();
        const output = await facade.findAll();

        expect(output.products).not.toBeNull();
        expect(output.products.length).toBe(2);

        expect(output.products[0].id).toBe("1");
        expect(output.products[0].name).toBe("Product 1");
        expect(output.products[0].description).toBe("Product 1 description");
        expect(output.products[0].salesPrice).toBe(10);

        expect(output.products[1].id).toBe("2");
        expect(output.products[1].name).toBe("Product 2");
        expect(output.products[1].description).toBe("Product 2 description");
        expect(output.products[1].salesPrice).toBe(20);
    })

})