import express, { Request, Response } from "express";

import  InvoiceFacadeFactory  from "../../../modules/invoice/factory/invoice-factory";

import { FindInvoiceFacadeInputDTO } from "../../../modules/invoice/facade/DTO/invoce-facade.dto";

export const invoiceRoutes = express.Router();

invoiceRoutes.get("/:id", async (request: Request, response: Response) => {
  const facade = InvoiceFacadeFactory.create();

  try {
    const input: FindInvoiceFacadeInputDTO = {
      id: request.params.id,
    };

    const invoice = await facade.find(input);

    response.status(200).json(invoice);
  } catch (error) {
    response.status(400).send(error);
  }
});
