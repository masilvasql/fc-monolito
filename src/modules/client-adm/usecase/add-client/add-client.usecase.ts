import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";

export default class AddClientUseCase implements UseCaseInterface{

    private clientRepository:ClientGateway;

    constructor(clientRepository:ClientGateway){
        this.clientRepository = clientRepository;
    }

    async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {

        const props = {
            id:new Id(input.id),
            name:input.name,
            email:input.email,
            address:input.address
        }
        
        const client = new Client(props);
        await this.clientRepository.add(client);

        const output = {
            id:client.id.id,
            name:client.name,
            email:client.email,
            address:client.address,
            createdAt:client.createdAt,
            updatedAt:client.updatedAt
        }

        return output;
    }

}