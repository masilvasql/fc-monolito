import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-paymente.usecase";
import PaymentFacadeInterface, { PaymentFacadeInputDTO, PaymentFacadeOutputDTO } from "./payment.facade.interface";

export default class PaymantFacade implements PaymentFacadeInterface{

    constructor(private processPaymentUsecase: ProcessPaymentUseCase){}

    async process(input: PaymentFacadeInputDTO): Promise<PaymentFacadeOutputDTO> {

        return await this.processPaymentUsecase.execute(input);
    }

}