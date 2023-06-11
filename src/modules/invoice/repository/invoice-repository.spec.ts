import { Sequelize } from "sequelize-typescript";

import Address from "../domain/Address.value-object";
import Product from "../domain/product.entity";
import Invoice from "../domain/invoice.entity";
import InvoiceRepository from "./invoice-repository";
import { InvoiceProductModel } from "./invoice-product.model";
import {InvoiceModel} from "./invoice.model";


describe("Invoice repository test", () => {
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

    it("should create invoice", async () => {

        const address = new Address('street', 'number', 'complement', 'city', 'state', 'zipCode')
        const product1 = new Product({ id: "1", name: "Produto1", price: 10 })
        const invoice = new Invoice({ name: "Invoice1", document: "123456789", address, items: [product1] })

        const invoiceRepository = new InvoiceRepository();
        await invoiceRepository.generate(invoice);


        const output = await InvoiceModel.findOne({ where: { id: invoice.id.id }, include: [{model: InvoiceProductModel, as: 'invoice_products'}] })
   
        expect(output.id).toEqual(invoice.id.id)
        expect(output.name).toEqual(invoice.name)
        expect(output.document).toEqual(invoice.document)
        expect(output.city).toEqual(invoice.address.city)
        expect(output.complement).toEqual(invoice.address.complement)
        expect(output.number).toEqual(invoice.address.number)
        expect(output.state).toEqual(invoice.address.state)
        expect(output.street).toEqual(invoice.address.street)
        expect(output.zipCode).toEqual(invoice.address.zipCode)
        
        expect(output.invoice_products[0].id).toEqual(invoice.items[0].id.id)
        expect(output.invoice_products[0].name).toEqual(invoice.items[0].name)
        expect(output.invoice_products[0].price).toEqual(invoice.items[0].price)
        expect(output.total).toEqual(invoice.total)
        expect(output.createdAt).toEqual(invoice.createdAt)
        expect(output.invoice_products.length).toEqual(1)


    })

    it("should find invoice", async () => {
        const address = new Address('street', 'number', 'complement', 'city', 'state', 'zipCode')
        const product1 = new Product({ id: "1", name: "Produto1", price: 10 })
        const invoice = new Invoice({ name: "Invoice1", document: "123456789", address, items: [product1] })

        const invoiceRepository = new InvoiceRepository();
        await invoiceRepository.generate(invoice);


        const output = await invoiceRepository.find(invoice.id.id)
   
        expect(output.id.id).toEqual(invoice.id.id)
        expect(output.name).toEqual(invoice.name)
        expect(output.document).toEqual(invoice.document)
        expect(output.address.city).toEqual(invoice.address.city)
        expect(output.address.complement).toEqual(invoice.address.complement)
        expect(output.address.number).toEqual(invoice.address.number)
        expect(output.address.state).toEqual(invoice.address.state)
        expect(output.address.street).toEqual(invoice.address.street)
        expect(output.address.zipCode).toEqual(invoice.address.zipCode)
        
        expect(output.items[0].id.id).toEqual(invoice.items[0].id.id)
        expect(output.items[0].name).toEqual(invoice.items[0].name)
        expect(output.items[0].price).toEqual(invoice.items[0].price)
        expect(output.total).toEqual(invoice.total)
        expect(output.createdAt).toEqual(invoice.createdAt)
        expect(output.items.length).toEqual(1)
    })
})