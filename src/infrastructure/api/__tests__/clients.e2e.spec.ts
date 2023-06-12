import{app, sequelize} from "../express"
import request from "supertest"
describe("E2E test for Clients", () => {
   
    beforeEach(async () => {
        await sequelize.sync({ force: true }) //Force true drops all tables and recreates them
    })

    afterAll(async () => {
        await sequelize.close() //Close connection to database
    })
    it("should create a client", async () => {
        
        const response = await request(app)
        .post("/clients")
        .send({
            name: "Teste",
            email: "teste@email.com",
            address: "Rua Teste",
            document: "123456789",
            street: "Rua Teste",
            number: "123",
            complement: "Teste",
            city: "Teste",
            state: "Teste",
            zipCode: "12345678"
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
        expect(response.body.name).toBe("Teste")
        expect(response.body.email).toBe("teste@email.com")
        expect(response.body.address).toBe("Rua Teste")
        expect(response.body.document).toBe("123456789")
        expect(response.body.street).toBe("Rua Teste")
        expect(response.body.number).toBe("123")
        expect(response.body.complement).toBe("Teste")
        expect(response.body.city).toBe("Teste")
        expect(response.body.state).toBe("Teste")
        expect(response.body.zipCode).toBe("12345678")

    })
})