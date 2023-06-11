import { Router } from "express";
import { AddProductInputDto, AddProductOutputDto} from "../../../modules/product-adm/usecase/add-product/add-product.dto"
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";

export  const productRoutes = Router();



productRoutes.post("/", async(req, res) => {
    try{
        const input:AddProductInputDto = {
            name:req.body.name,
            description:req.body.description,
            purchasePrice:req.body.purchasePrice,
            stock:req.body.stock
        }
        const productFactory = ProductAdmFacadeFactory.create();
        const output:any = await productFactory.addProduct(input);
        res.status(201).send(output);
    }catch(error:any){
        res.status(400).send({error:error.message})
    }
})