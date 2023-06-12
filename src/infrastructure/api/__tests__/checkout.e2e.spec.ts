import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import { InvoiceProductModel } from "../../../modules/invoice/repository/invoice-product-model/invoice-product.model";
import { InvoiceModel } from "../../../modules/invoice/repository/invoice.model";
import { ProductModel } from "../../../modules/product-adm/repository/product.model";
import { app, sequelize } from "../express";
import request from "supertest";


describe("E2E test for checkout", () => {
  beforeEach(async () => {
    sequelize.addModels([InvoiceModel, InvoiceProductModel]);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should do the checkout", async () => {
    await ClientModel.create({
      id: "111",
      name: "Client 1111",
      email: "client@example.com",
      address: "Address 1",
      document: "123456",
      street: "Street 1",
      number: "1",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "0000",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await ProductModel.create({
      id: "1",
      name: "My Product",
      description: "Product description",
      purchasePrice: 100,
      salesPrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await ProductModel.create({
      id: "2",
      name: "My Product 2",
      description: "Product description",
      purchasePrice: 25,
      salesPrice: 25,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app)
      .post("/checkout")
      .send({
        clientId: "111",
        products: [{ productId: "1" }, { productId: "2" }],
      });

   

    expect(response.status).toEqual(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.invoiceId).toBeDefined();
    expect(response.body.total).toEqual(125);
    expect(response.body.status).toEqual("approved");
  });
});