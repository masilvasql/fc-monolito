import { Sequelize } from "sequelize-typescript";
import TransactionModel from "./transaction.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Transaction from "../domain/transaction";
import TransactionRepository from "./transaction.repository";
 

describe('TransactionRepository unit Test', () => {	

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

      const repository = new TransactionRepository();
      const transactionRepository = await repository.save(tranasction);
  
      expect(transactionRepository.id.id).toEqual("1");
      expect(transactionRepository.orderId).toEqual("1");
      expect(transactionRepository.amount).toEqual(100);
      expect(transactionRepository.status).toEqual("approved");
      expect(transactionRepository.createdAt).toBeInstanceOf(Date);
      expect(transactionRepository.updatedAt).toBeInstanceOf(Date);
      

    })
  

})