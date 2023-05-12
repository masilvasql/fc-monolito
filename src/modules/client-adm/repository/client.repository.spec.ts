import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";


describe("ClientRepository Test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([ClientModel]);
        await sequelize.sync({ force: true });

    })

    afterEach(async () => {
        sequelize.close()
    })
    it("Should find a client", async () => {

        const client =  await ClientModel.create({
            id: "1",
            name: "Client 1",
            email: "email@teste.com",
            address: "Address 1",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const clientRepository = new ClientRepository();
        const result = await clientRepository.find(client.id);
        
        expect(result.id.id).toEqual(client.id);
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        expect(result.address).toEqual(client.address);
        expect(result.createdAt).toEqual(client.createdAt);
        expect(result.updatedAt).toEqual(client.updatedAt);

    })

    it("Should add a client", async () => {
    
        const client = new Client({
            id: new Id("1"),
            name: "Client 1",
            email: "teste@teste.com",
            address: "Address 1",
        });

        const clientRepository = new ClientRepository();
        await clientRepository.add(client);

        const clientDB = await ClientModel.findOne({ where: { id: client.id.id } });

        expect(clientDB.id).toEqual(client.id.id);
        expect(clientDB.name).toEqual(client.name);
        expect(clientDB.email).toEqual(client.email);
        expect(clientDB.address).toEqual(client.address);
        expect(clientDB.createdAt).toEqual(client.createdAt);
        expect(clientDB.updatedAt).toEqual(client.updatedAt);
        
    
    })

})