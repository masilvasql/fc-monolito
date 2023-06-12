import Id from "../../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface from "../../../../client-adm/facade/client-adm-facade.interface";
import InvoiceFacadeInterface from "../../../../invoice/facade/invoice-facade.interface";
import PaymentFacadeInterface from "../../../../payment/facade/payment.facade.interface";
import ProductAdmFacadeInterface from "../../../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeInterface from "../../../../store-catalog/facade/store-catalog.facade.interface";
import CheckoutGateway from "../../../gateway/checkout.gateway";
import Client from "../../client.entity";
import Order from "../../order.entity";
import Product from "../../product.entity";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {

    private _clientFacade: ClientAdmFacadeInterface
    private _productFacade: ProductAdmFacadeInterface
    private _catalogFacade: StoreCatalogFacadeInterface
    private _repository: CheckoutGateway
    private _invoiceFacade: InvoiceFacadeInterface
    private _paymentFacade: PaymentFacadeInterface

    constructor(
        clientFacade: ClientAdmFacadeInterface,
        productFacade: ProductAdmFacadeInterface,
        catalogFacade: StoreCatalogFacadeInterface,
        repository: CheckoutGateway,
        invoiceFacade: InvoiceFacadeInterface,
        paymentFacade: PaymentFacadeInterface

    ) {
        this._clientFacade = clientFacade
        this._productFacade = productFacade
        this._catalogFacade = catalogFacade
        this._repository = repository
        this._invoiceFacade = invoiceFacade
        this._paymentFacade = paymentFacade
    }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        const client = await this._clientFacade.find({ id: input.clientId })
        if (!client) {
            throw new Error("Client not found")
        }
   

        await this.validateProducts(input)

        const prodcuts = await Promise.all(
            input.products.map(async p => await this.getProduct(p.productId))
        )

        //criar o objeto do cliente
        const myClient = new Client({
            id: new Id(client.id),
            name: client.name,
            email: client.email,
            address: client.street,
        })

        const order = new Order({
            client: myClient,
            products: prodcuts,
        })
        
        const payment = await this._paymentFacade.process({
            orderId: order.id.id,
            amount: order.total,
        })

        const invoice =  payment.status === 'approved' ? await this._invoiceFacade.generate({
            name: client.name,
            document: client.document,
            street: client.street,
            city: client.city,
            state: client.state,
            complement: client.complement,
            zipCode: client.zipCode,
            number: client.number,
            items: order.products.map(p => ({	
                id: p.id.id,
                name: p.name,
                price: p.salesPrice,
            }))
        }) : null

        payment.status === 'approved' && order.approved()
        this._repository.addOrder(order)

        const output: PlaceOrderOutputDto = {
            id: order.id.id,
            invoiceId: invoice?.id || null,
            status: order.status,
            total: order.total,
            products: order.products.map(p => ({
                productId: p.id.id,
            })),

        }

        return output
    }

    private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
        if (input.products.length === 0) {
            throw new Error("No products selected")
        }

        for (const p of input.products) {
            const product = await this._productFacade.checkStock({ productId: p.productId })
            if (product.stock <= 0) {
                throw new Error(`Product ${p.productId} is not available in stock`)
            }
        }
    }

    private async getProduct(productId: string): Promise<Product> {
        const product = await this._catalogFacade.find({ id: productId })
        if (!product) {
            throw new Error(`Product not found`)
        }
        const productProps = {
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,

        }

        return new Product(productProps)
    }

}