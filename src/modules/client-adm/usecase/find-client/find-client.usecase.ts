import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ClientGateway from "../../gateway/client.gateway";
import FindClientInputDto, { FindClientOutputDto } from "./find-client.usecase.dto";

export default class FindClientUseCase implements UseCaseInterface{

    private clientRepository:ClientGateway;

    constructor(clientRepository:ClientGateway){
        this.clientRepository = clientRepository;
    }

    async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {

        const result = await this.clientRepository.find(input.id);

        const output = {
            id:result.id.id,
            name:result.name,
            email:result.email,
            address:result.address,
            document:result.document,
            street:result.street,
            number:result.number,
            complement:result.complement,
            city:result.city,
            state:result.state,
            zipCode:result.zipCode,
            
            createdAt:result.createdAt,
            updatedAt:result.updatedAt
        }


        return output;
    }

}