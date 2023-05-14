import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import { AddClientFacadeInputDTO } from "./DTO/client-adm-facade.dto";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";

describe("Client-adm FACADE Test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
        await sequelize.addModels([ClientModel])
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should add a client", async ()=>{
        const repository = new ClientRepository();
        const addUseCase = new AddClientUseCase(repository);
        const facade = new ClientAdmFacade({
            addUseCase:addUseCase,
            findUseCase: undefined
        })

        const input:AddClientFacadeInputDTO={
            id:"1",
            name:"Teste",
            email:"email",
            address:"address"
        }

        await facade.add(input)

        const clientFound = await ClientModel.findOne(
            {
                where:{
                    id:"1" 
                }
            }
        )

        expect(clientFound).toBeDefined()
        expect(clientFound.id).toBe(input.id);
        expect(clientFound.name).toBe(input.name);
        expect(clientFound.email).toBe(input.email);
        expect(clientFound.address).toBe(input.address);

    })

    it("should find a client", async ()=>{
        const repository = new ClientRepository();
        const addUseCase = new AddClientUseCase(repository);
        const findUseCase = new FindClientUseCase(repository);
        const facade = new ClientAdmFacade({
            addUseCase:addUseCase,
            findUseCase: findUseCase
        })

        const input:AddClientFacadeInputDTO={
            id:"1",
            name:"Teste",
            email:"email",
            address:"address"
        }

        await facade.add(input)

        const clientFound = await facade.find({id:"1"})

        expect(clientFound).toBeDefined()
        expect(clientFound.id).toBe(input.id);
        expect(clientFound.name).toBe(input.name);
        expect(clientFound.email).toBe(input.email);
        expect(clientFound.address).toBe(input.address);

    })
})