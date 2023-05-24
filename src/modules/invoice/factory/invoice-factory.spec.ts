import { Sequelize } from "sequelize-typescript";

import { InvoiceProductModel } from "../repository/invoice-product.model";
import { GenerateInvoiceFacadeInputDto } from "../facade/DTO/invoce-facade.dto";
import InvoiceFactory from "./invoice-factory";
import InvoiceModel from "../repository/invoice.model";


describe("InvoiceFacade Test ", () => {
    let sequileze: Sequelize;

    beforeEach(async () => {
        sequileze = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequileze.addModels([InvoiceModel, InvoiceProductModel]);
        await sequileze.sync();
    });

    afterEach(async () => {
        await sequileze.close();
    });

    it("should create a invoice", async () => {
        
        let input:GenerateInvoiceFacadeInputDto = {
            name: "Invoice1",
            document: "123456789",
            street: "street",
            number: "number",
            complement: "complement",
            city: "city",
            state: "state",
            zipCode: "zipCode",
            items: [
                {
                    id: "1",
                    name: "Produto1",
                    price: 10
                },
                {
                    id: "2",
                    name: "Produto2",
                    price: 20
                }
            ],
        }

       
        const facade = InvoiceFactory.create()
        const output = await facade.generate(input)

        expect(output.id).not.toBeNull()
        expect(output.name).toEqual(input.name)
        expect(output.document).toEqual(input.document)
        expect(output.city).toEqual(input.city)
        expect(output.complement).toEqual(input.complement)
        expect(output.number).toEqual(input.number)
        expect(output.state).toEqual(input.state)
        expect(output.street).toEqual(input.street)
        expect(output.zipCode).toEqual(input.zipCode)

        expect(output.items[0].id).toBe(input.items[0].id)
        expect(output.items[0].name).toEqual(input.items[0].name)
        expect(output.items[0].price).toEqual(input.items[0].price)

        expect(output.items[1].id).toBe(input.items[1].id)
        expect(output.items[1].name).toEqual(input.items[1].name)
        expect(output.items[1].price).toEqual(input.items[1].price)

        expect(output.total).toEqual(30)
    
    })

    it("should find a invoice", async () => {
        let input:GenerateInvoiceFacadeInputDto = {
            name: "Invoice1",
            document: "123456789",
            street: "street",
            number: "number",
            complement: "complement",
            city: "city",
            state: "state",
            zipCode: "zipCode",
            items: [
                {
                    id: "1",
                    name: "Produto1",
                    price: 10
                },
                {
                    id: "2",
                    name: "Produto2",
                    price: 20
                }
            ],
        }

        const facade = InvoiceFactory.create()
        const output = await facade.generate(input)
        const found = await facade.find({id:output.id})

        expect(found.id).not.toBeNull()
        expect(found.name).toEqual(input.name)
        expect(found.document).toEqual(input.document)
        expect(found.address.city).toEqual(input.city)
        expect(found.address.complement).toEqual(input.complement)
        expect(found.address.number).toEqual(input.number)
        expect(found.address.state).toEqual(input.state)
        expect(found.address.street).toEqual(input.street)
        expect(found.address.zipCode).toEqual(input.zipCode)

        expect(found.items[0].id).toBe(input.items[0].id)
        expect(found.items[0].name).toEqual(input.items[0].name)
        expect(found.items[0].price).toEqual(input.items[0].price)

        expect(found.items[1].id).toBe(input.items[1].id)
        expect(found.items[1].name).toEqual(input.items[1].name)
        expect(found.items[1].price).toEqual(input.items[1].price)

        expect(found.total).toEqual(30)
    })

})
