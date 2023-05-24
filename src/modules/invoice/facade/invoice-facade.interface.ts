import { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./DTO/invoce-facade.dto";

export default interface InvoiceFacadeInterface {
    find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO>;
    generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto>;
}