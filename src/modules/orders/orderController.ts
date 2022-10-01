import { Request, response, Response } from "express";
import { CreateOrderService, CloseOrderService, SendOrderService, ListOrderService, GetOrderService, FinishOrderService } from "./orderService";


class CreateOrderController{
    async handle(req: Request, res: Response) {
        const { table, name} = req.body;

        const createOrderService = new CreateOrderService();

        const order = await createOrderService.execute({table, name});

        return res.json(order)

    }
};

class CloseOrderController{
    async handle(req: Request, res: Response) {
        const id = req.query.id as string;

        const closeOrderService = new CloseOrderService();

        const order = await closeOrderService.execute({id});

        return res.json(order)

    }
};

class SendOrderController{
    async handle(req: Request, res: Response) {
        const { id } = req.body;

        const sendOrderService = new SendOrderService();

        const sendOrder = await sendOrderService.execute({id});

        return res.json(sendOrder)

    }
};

class ListOrderController{
    async handle(req: Request, res: Response) {

        const listOrderService = new ListOrderService();
        const listOrder = await listOrderService.execute();

        return res.json(listOrder)
    }
};

class GetOrderController{
    async handle(req: Request, res: Response) {

        const id = req.query.id as string;

        const getOrderService = new GetOrderService();
        const getOrder = await getOrderService.execute({id});

        return res.json(getOrder)
    }
};

class FinishOrderController{
    async handle(req: Request, res: Response) {
        const id = req.query.id as string;

        const finishOrderService = new FinishOrderService();
        const finishOrder = await finishOrderService.execute({id});

        return res.json(finishOrder)
    }
};

export { CreateOrderController, CloseOrderController, SendOrderController, ListOrderController, GetOrderController, FinishOrderController }