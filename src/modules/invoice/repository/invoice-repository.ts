import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/Address.value-object";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/product.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceProductModel } from "./invoice-product.model";
import InvoiceModel from "./invoice.model";





export default class InvoiceRepository implements InvoiceGateway {
    async find(id: string): Promise<Invoice> {
        const output = await InvoiceModel.findOne({ where: { id: id }, include: [{model: InvoiceProductModel, as: 'invoice_products'}] })

        const addres = new Address(output.street, output.number, output.complement, output.city, output.state, output.zipCode)
        const products = output.invoice_products.map(item => {
            return new Product({ id: item.id, name: item.name, price: item.price })
        })
        const invoice = new Invoice(
            {
                id:new Id(output.id), 
                name: output.name, 
                document: output.document, 
                address: addres, 
                items: products,
                createdAt: output.createdAt,
                updatedAt: output.updatedAt, 
            })
   
        return invoice

    }

    async generate(invoice: Invoice): Promise<void> {

        await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            invoice_products: invoice.items.map(item => ({
                id: item.id.id,
                name: item.name,
                price: item.price
            })),
            updatedAt: invoice.updatedAt,
            createdAt: invoice.createdAt,
            total: invoice.total,
        },
        {
            include: [{model: InvoiceProductModel, as: 'invoice_products'}]
        })
    }

}