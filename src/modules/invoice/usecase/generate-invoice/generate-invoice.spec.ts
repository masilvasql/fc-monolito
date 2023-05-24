import Id from "../../../@shared/domain/value-object/id.value-object"
import Address from "../../domain/Address.value-object"
import Invoice from "../../domain/invoice.entity"
import Product from "../../domain/product.entity"
import { GenerateInvoiceUseCaseInputDto } from "./generate-inovice.dto"
import GenerateInvoiceUseCase from "./generate-invoice.usecase"

const address = new Address('street', 'number', 'complement', 'city', 'state', 'zipCode')
const product1 = new Product({id:"1", name:"Produto1", price:10})
const product2 = new Product({id:"2", name:"Produto2", price:20})
const invoice = new Invoice({name:"Invoice1", document:"123456789", address, items:[product1, product2]})

let MockRepository = () => {
    return {
        find: jest.fn().mockResolvedValue(Promise.resolve(invoice)),
        generate: jest.fn(),
    };
}


describe("GenerateInvoice use case test", () => {
    it("should generate invoice", async () => {
        let repository = MockRepository()
        let generateInvoiceUseCase = new GenerateInvoiceUseCase(repository)

        let input:GenerateInvoiceUseCaseInputDto = {
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

        const output = await generateInvoiceUseCase.execute(input)


        expect(repository.generate).toBeCalledTimes(1)
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
})