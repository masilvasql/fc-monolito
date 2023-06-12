import Id from "../../../@shared/domain/value-object/id.value-object"
import Client from "../../domain/client.entity"
import FindClientUseCase from "./find-client.usecase"

const client = new Client({
    id: new Id("1234"),
    name: "name",
    email: "email",
    address: "address",
    document: "document",
    street: "street",
    number: "number",
    complement: "complement",
    city: "city",
    state: "state",
    zipCode: "zipCode",
})

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockResolvedValue(Promise.resolve(client))
    }

}

describe("FindClientUseCase Test", () => {
    it("Should find a client", async () => {
        const repository = MockRepository();
        const useCase = new FindClientUseCase(repository);
        const input = {
            id: client.id.id
        }

        const output = await useCase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(output).toEqual({
            id: input.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
            document: client.document,
            street: client.street,
            number: client.number,
            complement: client.complement,
            city: client.city,
            state: client.state,
            zipCode: client.zipCode
            
        })


    })
})