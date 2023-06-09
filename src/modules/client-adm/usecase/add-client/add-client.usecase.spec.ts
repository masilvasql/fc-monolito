import Client from "../../domain/client.entity";
import AddClientUseCase from "./add-client.usecase";

const MockRepository = ()=> {
    return {
        add: jest.fn(),
        find: jest.fn(),
    }
}

describe("AddClientUseCase Test", () => {
    it("Should add a client", async () => {
        const repository = MockRepository();
        const useCase = new AddClientUseCase(repository);
        const input ={
            name:"name",
            email:"email",
            address:"address",
            document:"document",
            city:"city",
            complement:"complement",
            number:"number",
            state:"state",
            street:"street",
            zipCode:"zipCode"

        }

        const output = await useCase.execute(input);
        
        expect(repository.add).toHaveBeenCalled();
        expect(output).toEqual({
            id:expect.any(String),
            name:"name",
            email:"email",
            address:"address",
            document:"document",
            city:"city",
            complement:"complement",
            number:"number",
            state:"state",
            street:"street",
            zipCode:"zipCode",
            
            createdAt:expect.any(Date),
            updatedAt:expect.any(Date)
        })
            

    })
})