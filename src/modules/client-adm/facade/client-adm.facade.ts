import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { AddClientFacadeInputDTO, FindClientFacadeInputDto, FindClientFacadeOutputDTO } from "./DTO/client-adm-facade.dto";
import ClientAdmFacadeInterface from "./client-adm-facade.interface";

export interface UseCaseProps{
    addUseCase:UseCaseInterface,
    findUseCase:UseCaseInterface
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {

    private addUseCase:UseCaseInterface
    private findUseCase:UseCaseInterface
    
    constructor(props: UseCaseProps){
        this.addUseCase = props.addUseCase;
        this.findUseCase = props.findUseCase;
    }

    async add(input: AddClientFacadeInputDTO): Promise<void> {
        return await this.addUseCase.execute(input)
    }
    async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDTO> {
        const result = await this.findUseCase.execute(input)
        const output: FindClientFacadeOutputDTO={
            address:result.address,
            email:result.email,
            id:result.id,
            createdAt:result.createdAt,
            name:result.name,
            updatedAt:result.updatedAt,
            document:result.document,
            street:result.street,
            number:result.number,
            complement:result.complement,
            city:result.city,
            state:result.state,
            zipCode:result.zipCode
        }
        return output
    }
}