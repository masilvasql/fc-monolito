
import Invoice from "../../domain/invoice.entity";
import Address from "../../domain/Address.value-object";
import Product from "../../domain/product.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";
import { FindInvoiceUseCaseInputDTO } from "./find-invoice.dto";


const address = new Address('street', 'number', 'complement', 'city', 'state', 'zipCode')
const product1 = new Product({id:"1", name:"Produto1", price:10})
const invoice = new Invoice({name:"Invoice1", document:"123456789", address, items:[product1]})


let MockRepository = () => {
    return {
        find: jest.fn().mockResolvedValue(Promise.resolve(invoice)),
        generate: jest.fn(),
    };
}

describe("FindInvoice use case test", () => {
     it('should find invoice', async () => {
        const repository = MockRepository()
        const findInvoiceUseCase = new FindInvoiceUseCase(repository)
        let input:FindInvoiceUseCaseInputDTO = {id: "1"} 
        const output = await findInvoiceUseCase.execute(input)

        expect(repository.find).toBeCalledTimes(1)
        expect(output.id).toEqual(invoice.id.id)
        expect(output.name).toEqual(invoice.name)
        expect(output.document).toEqual(invoice.document)
        expect(output.address.city).toEqual(invoice.address._city)
        expect(output.address.complement).toEqual(invoice.address._complement)
        expect(output.address.number).toEqual(invoice.address._number)
        expect(output.address.state).toEqual(invoice.address._state)
        expect(output.address.street).toEqual(invoice.address._street)
        expect(output.address.zipCode).toEqual(invoice.address._zipCode)
        expect(output.items[0].id).toEqual(invoice.items[0].id.id)
        expect(output.items[0].name).toEqual(invoice.items[0].name)
        expect(output.items[0].price).toEqual(invoice.items[0].price)
        expect(output.total).toEqual(invoice.total)
        expect(output.createdAt).toEqual(invoice.createdAt)
        expect(output.items.length).toEqual(1)

    })
}) 