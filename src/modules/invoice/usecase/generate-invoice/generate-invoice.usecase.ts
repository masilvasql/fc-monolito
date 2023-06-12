import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Address from "../../domain/Address.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";

import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-inovice.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {

    private _invoiceInterface: InvoiceGateway

    constructor(invoiceInterface: InvoiceGateway) {
        this._invoiceInterface = invoiceInterface
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {

       const adders = new Address(input.street, input.number , input.complement, input.city, input.state, input.zipCode)
       const products = input.items.map(item => {
              return new Product({ id: item.id, name: item.name, price: item.price })
         })
        const invoice = new Invoice({ name: input.name, document: input.document, address: adders, items: products })
     
        await this._invoiceInterface.generate(invoice)

        const output: GenerateInvoiceUseCaseOutputDto = {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address._street,
            number: invoice.address._number,
            complement: invoice.address._complement,
            city: invoice.address._city,
            state: invoice.address._state,
            zipCode: invoice.address._zipCode,
            items: invoice.items.map(item => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price
                }
            }
            ),
            total: invoice.total,
        }
   
        return output
    }
}