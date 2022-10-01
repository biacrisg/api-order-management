import Prisma from './../../prisma/index';


interface ItemCreate{
    amount: number,
    id_order: string,
    id_product: string
}

interface ItemDelete{
  id: string
}


class CreateItemService{
    async execute({amount, id_order, id_product}: ItemCreate){
        
        const createItem = await Prisma.item.create({
            data: {
                amount: amount,
                id_order: id_order,
                id_product: id_product
                  }
        });

        return { ok: true, createItem}
    }
}

class DeleteItemService{
    async execute({id}: ItemDelete){
        
        const deleteItem = await Prisma.item.delete({
          where: {
            id: id
          }
        });

        return { ok: true, deleteItem}
    }
};


export { CreateItemService, DeleteItemService }