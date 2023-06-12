import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { OrderModel } from "../../modules/checkout/repository/order.model";
import { ClientModel } from '../../modules/client-adm/repository/client.model';
import { InvoiceModel } from '../../modules/invoice/repository/invoice.model';
import TransactionModel from '../../modules/payment/repository/transaction.model'
import { ProductModel as StoreCatalogProductModel } from "../../modules/store-catalog/repository/product.model";
import { ProductModel as AdmProductModel } from "../../modules/product-adm/repository/product.model";


import { productRoutes } from './routes/product.routes';
import { clientRoutes } from './routes/clients.routes';
import { checkoutRoutes } from './routes/checkout.routes';
import { invoiceRoutes } from './routes/invoice.routes';
import { InvoiceProductModel } from '../../modules/invoice/repository/invoice-product-model/invoice-product.model';


export const app: Express = express()

app.use(express.json())
app.use("/products", productRoutes)
app.use("/clients", clientRoutes)
app.use("/checkout", checkoutRoutes)
app.use("/invoice", invoiceRoutes)

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
    });
    sequelize.addModels([
        OrderModel,
        ClientModel,
        
        TransactionModel,
        StoreCatalogProductModel,
        AdmProductModel]);
    await sequelize.sync(
        { force: true }
    );
}

setupDb();

