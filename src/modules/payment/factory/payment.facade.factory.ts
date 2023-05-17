import PaymantFacade from "../facade/payment.facade";
import PaymentFacadeInterface from "../facade/payment.facade.interface";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-paymente.usecase";

export default class PaymentFactory{
    static create():PaymentFacadeInterface{
        const repository = new TransactionRepository();
        const useCase = new ProcessPaymentUseCase(repository);
        const facade = new PaymantFacade(useCase);
        return facade;
    }
}