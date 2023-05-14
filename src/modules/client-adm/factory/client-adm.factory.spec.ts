import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientAdmFacadeFacadeFactory from "./client-adm.factory";
import { AddClientFacadeInputDTO } from "../facade/DTO/client-adm-facade.dto";

describe("Clien Adm Factory Test",  ()=>{
    let sequelize :Sequelize
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

    it("Should Create a Client", async ()=>{
        const factory = ClientAdmFacadeFacadeFactory.create();
        
        const input:AddClientFacadeInputDTO={
            id:"1",
            name:"Teste",
            email:"email",
            address:"address"
        }

        await factory.add(input)

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

    it("Should Find a Client", async ()=>{
        const factory = ClientAdmFacadeFacadeFactory.create();
        
        const input:AddClientFacadeInputDTO={
            id:"1",
            name:"Teste",
            email:"email",
            address:"address"
        }

        await factory.add(input)

        const clientFound = await factory.find({id:"1"})

        expect(clientFound).toBeDefined()
        expect(clientFound.id).toBe(input.id);
        expect(clientFound.name).toBe(input.name);
        expect(clientFound.email).toBe(input.email);
        expect(clientFound.address).toBe(input.address);

    })

})