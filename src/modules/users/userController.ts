import { Request, response, Response } from "express";
import { CreateUserService, AuthUserService, GetuserService } from "./userService";

class CreateUserController{
    async handle(req: Request, res: Response){
        const { name, email, password } = req.body

        const createUserService = new CreateUserService();
        const user = await createUserService.execute({name, email, password});

        return res.json(user)
    }
}

class AuthUserController{
    async handle(req: Request, res: Response){
        const { email, password } = req.body

        const authUserService = new AuthUserService();
        const auth = await authUserService.execute({
            email,
            password
        });

        return res.json(auth)
    }
}

class GetuserServiceController{
   async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const getuserService = new GetuserService();
    const user = await getuserService.execute(user_id)

    return res.json(user)
   }
}

export { CreateUserController, AuthUserController, GetuserServiceController }