import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../repository/transaction.model";
import Transaction from "../domain/transaction";
import Id from "../../@shared/domain/value-object/id.value-object";
import PaymentFactory from "./payment.facade.factory";

describe("PaymentFacade unit Test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([TransactionModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a transaction", async () => {
        const tranasction = new Transaction({
            id: new Id("1"),
            orderId: "1",
            amount: 100,
        })
        tranasction.approve();

        const factory = PaymentFactory.create();
        const output = await factory.process(tranasction);

        expect(output.transactionId).toBeDefined();
        expect(output.orderId).toEqual(tranasction.orderId);
        expect(output.amount).toEqual(tranasction.amount);
        expect(output.status).toEqual("approved");
        expect(output.createdAt).toBeInstanceOf(Date);
        expect(output.updatedAt).toBeInstanceOf(Date);

        


    })
})