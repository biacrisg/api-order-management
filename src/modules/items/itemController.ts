import { Request, response, Response } from "express";
import { CreateItemService, DeleteItemService } from "./itemService";


class CreateItemController{
    async handle(req: Request, res: Response){
        const { amount, id_product, id_order} = req.body;

        const createItemService = new CreateItemService();
        const item = await createItemService.execute({amount, id_product, id_order});

        return res.json(item)
    }
}

class DeleteItemController{
    async handle(req: Request, res: Response){
        const id = req.query.id as string;

        const deleteItemService = new DeleteItemService();
        const order = await deleteItemService.execute({id});

        return res.json(order)
    }
}

export { CreateItemController, DeleteItemController }