import Prisma from './../../prisma/index';
import { sign } from 'jsonwebtoken';


interface OrderCreate{
    name: string,
    table: number,

}

interface OrderUpdate{
   id: string;
};

interface sendOrder{
    id: string;
 };

 interface getOrder{
    id: string;
 };

class CreateOrderService{
    async execute({name, table}: OrderCreate){
        
        const createOrder = await Prisma.order.create({
            data: {
                name: name, 
                table: table,
                draft: true
            }
        })

        return { ok: true, createOrder}
    }
};

class CloseOrderService{
    async execute({id}: OrderUpdate){
        
        const deleteOrder = await Prisma.order.delete({
            where: {
                id: id
            }
        })

        return { ok: true, deleteOrder}
    }
};

class SendOrderService{
    async execute({id}: sendOrder){
        
        const sendOrder = await Prisma.order.update({
            where: {
                id: id
            },
            data: {
                draft: false
            }
        });

        return { ok: true, sendOrder}
    }
};

class ListOrderService{
    async execute(){
        
        const listOrder = await Prisma.order.findMany({
            where: {
                draft: false,
                status: false
            },
        });

        return { ok: true, listOrder}
    }
};

class GetOrderService{
    async execute({id}: getOrder){
        
        const getOrder = await Prisma.order.findFirst({
            where: {
               id:id
            }, include:{
                itens: {
                    include: { product: true }
                }
            }
        });

        return { ok: true, getOrder}
    }
};

class FinishOrderService{
    async execute({id}: OrderUpdate){
        
        const finishOrder = await Prisma.order.update({
            where: {
                id: id
            }, data: {
           status: true
            }
        })

        return { ok: true, finishOrder}
    }
};

export { CreateOrderService, CloseOrderService, SendOrderService, ListOrderService, GetOrderService, FinishOrderService }