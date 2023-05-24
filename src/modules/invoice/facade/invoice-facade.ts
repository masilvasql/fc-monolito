import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./DTO/invoce-facade.dto";
import InvoiceFacadeInterface from "./invoice-facade.interface";

export interface UseCaseProps{
    findInvoice:UseCaseInterface,
    generateInvoice:UseCaseInterface
}

export default class InvoiceFacade implements InvoiceFacadeInterface{

    private findInvoice:UseCaseInterface;
    private generateInvoice:UseCaseInterface;

    constructor(props:UseCaseProps){
        this.findInvoice = props.findInvoice;
        this.generateInvoice = props.generateInvoice;
    }

    async find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        const invoice = await this.findInvoice.execute(input);
        const output:FindInvoiceFacadeOutputDTO = {
            id: invoice.id,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
            },
            items: invoice.items.map((item: { id: any; name: any; price: any; }) => {

                return {
                    id: item.id,
                    name: item.name,
                    price: item.price
                }
            }),
            total: invoice.total,
            createdAt: invoice.createdAt
        }
        return output;
    }

    async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        const invoice = await this.generateInvoice.execute(input);

        const output:GenerateInvoiceFacadeOutputDto = {
            id: invoice.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.street,
            number: invoice.number,
            complement: invoice.complement,
            city: invoice.city,
            state: invoice.state,
            zipCode: invoice.zipCode,
            items: invoice.items.map((item: { id: any; name: any; price: any; }) => {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.price
                }
            }
            ),
            total: invoice.total,
        }
        return output;
    }

}