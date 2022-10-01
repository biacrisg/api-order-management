import Prisma from './../../prisma/index';


interface ProductCreate{
    name: string,
    price: string,
    description: string,
    banner: string,
    id_category: string
}

interface ProductRequest{
    id_category: string
}

class CreateProductService{
    async execute({name, price, description, banner, id_category}: ProductCreate){
        
        const createProduct = await Prisma.product.create({
            data: {
                name: name, 
                price: price,
                description: description,
                banner: banner,
                id_category: id_category
            }
        })

        return { ok: true, createProduct}
    }
};

class ListProductService{
    async execute({id_category}: ProductRequest){
        
        const listProduct= await Prisma.product.findMany({
            where:{
                id_category: id_category
               }
        });

        return { ok: true, listProduct}
    }
}

export { CreateProductService, ListProductService }