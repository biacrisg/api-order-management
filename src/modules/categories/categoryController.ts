import { Request, response, Response } from "express";
import { CreateCategoryService, ListCategoryService } from "./categorySevice";

class CreateCategoryController{
    async handle(req: Request, res: Response){
        const { name } = req.body

        const createCategoryService = new CreateCategoryService();
        const createCategory = await createCategoryService.execute({name});

        return res.json(createCategory)
    }
}

class ListCategoryController{
    async handle(req: Request, res: Response){

        const listCategoryService = new ListCategoryService();
        const listCategory = await listCategoryService.execute();

        return res.json(listCategory)
    }
}


export { CreateCategoryController, ListCategoryController }
