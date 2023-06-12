import {Router} from 'express'
import {AddClientInputDto, AddClientOutputDto} from "../../../modules/client-adm/usecase/add-client/add-client.usecase.dto"
import ClientAdmFacadeFacadeFactory from "../../../modules/client-adm/factory/client-adm.factory"
export const clientRoutes = Router()

clientRoutes.post("/", async (req, res) => {
    try{
        const input: AddClientInputDto = {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            document: req.body.document,
            street: req.body.street,
            number: req.body.number,
            complement: req.body.complement,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode
        }

        const cliendAdmFactory = ClientAdmFacadeFacadeFactory.create()
        const output: any = await cliendAdmFactory.add(input)
        res.status(201).json(output)
    }catch(error:any){
        res.status(400).json({error:error.message})
    }
})