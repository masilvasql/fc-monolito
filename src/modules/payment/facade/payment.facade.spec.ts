import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../repository/transaction.model";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-paymente.usecase";
import PaymantFacade from "./payment.facade";

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

        const repository = new TransactionRepository();
        const useCase = new ProcessPaymentUseCase(repository);
        const facade = new PaymantFacade(useCase);

        const input = {
            orderId: "1",
            amount: 100
        }

        const output = await facade.process(input);

        expect(output.transactionId).toBeDefined();
        expect(output.orderId).toEqual(input.orderId);
        expect(output.amount).toEqual(input.amount);
        expect(output.status).toEqual("approved");
        expect(output.createdAt).toBeInstanceOf(Date);
        expect(output.updatedAt).toBeInstanceOf(Date);


    })
})