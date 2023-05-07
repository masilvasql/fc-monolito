import { Sequelize } from "sequelize-typescript"
import ProductModel from "../repository/product.model";
import ProductAdmFacadeFactory from "./facade.factory";

describe("facade factory Test", () => {

    let sequelize :Sequelize;

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

    it("should create a Product", async () => {
        const productAdmFacadeFactory =  ProductAdmFacadeFactory.create();
        expect(productAdmFacadeFactory).not.toBeNull();

        const input = {
            id: "1",
            name: "product 1",
            description: "product 1 description",
            purchasePrice: 10,
            stock: 10
        }

        await productAdmFacadeFactory.addProduct(input);

        const product = await ProductModel.findOne({ where: { id: input.id } });

        expect(product).not.toBeNull();
        expect(product.id).toBe(input.id);
        expect(product.name).toBe(input.name);
        expect(product.description).toBe(input.description);
        expect(product.purchasePrice).toBe(input.purchasePrice);
        expect(product.stock).toBe(input.stock);
        
    })

    it("should check stock from a product", async ()=>{
        const productAdmFacadeFactory =  ProductAdmFacadeFactory.create();
        expect(productAdmFacadeFactory).not.toBeNull();

        const input = {
            id: "1",
            name: "product 1",
            description: "product 1 description",
            purchasePrice: 10,
            stock: 10
        }

        await productAdmFacadeFactory.addProduct(input);

        const inputCheckStock = {
            productId: input.id
        }

        const output = await productAdmFacadeFactory.checkStock(inputCheckStock)

        expect(output.productId).toBe(input.id)
        expect(output.stock).toBe(input.stock)


        
    })

})