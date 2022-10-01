import Prisma from './../../prisma/index';

interface CategoryCreate{
    name: string
}

// interface CategoryList{
//     id: string
// }


class CreateCategoryService{
    async execute({name}: CategoryCreate){
        
        const createCategory = await Prisma.category.create({
            data: {
                name: name
            }
        })
        console.log('cria', createCategory)

        return { ok: true, createCategory}
    }
};

class ListCategoryService{
    async execute(){
        
        const listCategory = await Prisma.category.findMany()
        console.log('cria', listCategory)

        return { ok: true, listCategory}
    }
}

export { CreateCategoryService, ListCategoryService }