import { Request, response, Response } from "express";
import { CreateProductService, ListProductService } from "./productService";

interface MulterRequest extends Request {
    file: any;
}

class CreateProductController{
    async handle(req: Request, res: Response): Promise <any> {
        const documentFile = (req as MulterRequest).file

        const { name, price, description, id_category} = req.body;
        const createProductService = new CreateProductService();

        if (!documentFile){
            throw new Error("Error file!")
        } else {
            const { originalname, filename} = documentFile;
            const user = await createProductService.execute({name, price, description, banner: filename, id_category});

            return res.json(user)
        }

       
    }
}

class ListProductController{
    async handle(req: Request, res: Response){
        const id_category = req.query.id_category as string;

        const listProductService = new ListProductService();
        const listProduct = await listProductService.execute({id_category});

        return res.json(listProduct)
    }
}

export { CreateProductController, ListProductController }