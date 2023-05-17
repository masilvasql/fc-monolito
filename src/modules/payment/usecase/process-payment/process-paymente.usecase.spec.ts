import Id from "../../../@shared/domain/value-object/id.value-object"
import Transaction from "../../domain/transaction"
import ProcessPaymentUseCase from "./process-paymente.usecase"
import { ProcessPaymentInputDto } from "./process.payment.dto"

const transaction = new Transaction({
    id: new Id("1"),
    orderId: "1",
    amount: 100,
    status: "approved",
})

const MockRepository = ()=>{
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction))
    }
}

const transactionDeclined = new Transaction({
    id: new Id("1"),
    orderId: "1",
    amount: 50,
    status: "declined",
})

const MockRepositoryDeclined = ()=>{
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transactionDeclined))
    }
}



describe('ProcessPaymentUsecase unit Test', () => {
    it("should approve a transaction ", async () => {
        const repository = MockRepository()
        const usecase = new ProcessPaymentUseCase(repository)
        const input:ProcessPaymentInputDto = {
            orderId: "1",
            amount: 100
        }
        const result = await usecase.execute(input)
        expect(repository.save).toHaveBeenCalled()
        expect(result.transactionId).toEqual(transaction.id.id)
        expect(result.orderId).toEqual("1")
        expect(result.amount).toEqual(100)
        expect(result.status).toEqual("approved")
        expect(result.createdAt).toEqual(transaction.createdAt)
        expect(result.updatedAt).toEqual(transaction.updatedAt)
    })

    it("should decline a transaction ", async () => {
        const repository = MockRepositoryDeclined()
        const usecase = new ProcessPaymentUseCase(repository)
        const input:ProcessPaymentInputDto = {
            orderId: "1",
            amount: 50
        }
        const result = await usecase.execute(input)
        expect(repository.save).toHaveBeenCalled()
        expect(result.transactionId).toEqual(transactionDeclined.id.id)
        expect(result.orderId).toEqual("1")
        expect(result.amount).toEqual(50)
        expect(result.status).toEqual("declined")
        expect(result.createdAt).toEqual(transactionDeclined.createdAt)
        expect(result.updatedAt).toEqual(transactionDeclined.updatedAt)
    })
})