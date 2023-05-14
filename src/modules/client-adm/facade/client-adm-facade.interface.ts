import { AddClientFacadeInputDTO, FindClientFacadeInputDto, FindClientFacadeOutputDTO } from "./DTO/client-adm-facade.dto";

export default interface ClientAdmFacadeInterface{
    add(input:AddClientFacadeInputDTO):Promise<void>
    find(input:FindClientFacadeInputDto):Promise<FindClientFacadeOutputDTO>
}