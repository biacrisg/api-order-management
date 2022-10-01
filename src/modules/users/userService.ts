import { compare, hash } from 'bcryptjs';
import Prisma from './../../prisma/index';
import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken'

interface UserRequest{
    name: string
    email: string
    password: string
}

interface AuthRequest{
    email: string;
    password: string;
}


class CreateUserService{
    async execute({name, email, password}: UserRequest) {

        const hashPassword = await hash(password, 8)

        if (!email){
            throw new Error("Email incorrect")
        }

        const userAlredyExist = await Prisma.user.findFirst({
            where: {
                email: email
            }
        });

        if (userAlredyExist) {
            throw new Error("Usuário já cadastrado")
        };

        const user = await Prisma.user.create({
            data:{
                name: name,
                email: email,
                password: hashPassword
            },
            select:{
                id: true,
                name:true, 
                email:true
            }
        });

        return { ok: true, user}
    }
}

class AuthUserService{
    async execute({email, password}: AuthRequest) {
        console.log('email', email)

        const user = await Prisma.user.findFirst({
            where: {
                email: email 
            }
        });

        if (!user) { throw new Error("Email não cadastrado")}

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) { throw new Error ("Senha incorreta")}

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
    }}
    
}

class GetuserService{
    async execute(user_id: string) {

        const user = await Prisma.user.findFirst({
            where: {
                id: user_id
            },
             select: {
                name: true,
                email: true
             }
        });

        return { ok: true, user}
    }
    
}

export { CreateUserService, AuthUserService, GetuserService }