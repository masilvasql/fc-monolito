import { Router } from "express"
import StoreCatalogFacadeFactory from "../../../modules/store-catalog/factory/facade.factory"
import InvoiceFactory from "../../../modules/invoice/factory/invoice-factory"
import PaymentFactory from "../../../modules/payment/factory/payment.facade.factory"
import { PlaceOrderInputDto } from "../../../modules/checkout/domain/usecase/place-order/place-order.dto"
import PlaceOrderUseCase from "../../../modules/checkout/domain/usecase/place-order/place-order.usecase"
import ClientAdmFacadeFacadeFactory from "../../../modules/client-adm/factory/client-adm.factory"
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory"
import { OrderRepository } from "../../../modules/checkout/repository/order.repository"
// import OrderRepository from "../../../modules/"
export const checkoutRoutes = Router()
const repository = new OrderRepository();
checkoutRoutes.post("/", async (req, res) => {
    try {
        const clientFacadeFactory =  ClientAdmFacadeFacadeFactory.create()
        const productFacadeFactory=  ProductAdmFacadeFactory.create()
        const storeCatalogFacadeInterface =  StoreCatalogFacadeFactory.create()
        const invoiceFacadeInterface =  InvoiceFactory.create()
        const paymentFacadeInterface =  PaymentFactory.create()
        const input: PlaceOrderInputDto = {
            clientId: req.body.clientId,
            products: req.body.products
        }
        const checkoutUseCase = new PlaceOrderUseCase(
            clientFacadeFactory,
            productFacadeFactory,
            storeCatalogFacadeInterface,
            repository,
            invoiceFacadeInterface,
            paymentFacadeInterface
        )

        const output:any =  await checkoutUseCase.execute(input)

        res.status(201).json(output)
    } catch (error:any) {
        res.status(400).json({ error: error.message })
    }
})

