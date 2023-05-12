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
            createdAt:result.createdAt,
            updatedAt:result.updatedAt
        }


        return output;
    }

}