import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import {PrismaService} from "../prisma/prisma.service"
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(private readonly  prisma:PrismaService){}


    async hash(password:string):Promise<string>{
        try {
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(password, saltOrRounds);
            return hash
            
        } catch (error) {
            throw Error('error in hash password !')
        }
        
    }
    

    async compare(password:string,hash:string){
        try {
            const isMatch = await bcrypt.compare(password, hash);
            return isMatch
        } catch (error) {
            throw Error("Error In Compare")
        }
    }


    async AddUser(data:Prisma.UserCreateInput):Promise<User>{

        try {
            

            data.password = await this.hash(data.password)
            
            const user = await  this.prisma.user.create({data})

            return user
            
        } catch (error) {
            
        }
    }

    async FindUserByEmail(email:string):Promise<User>{
        try {

            const user = await this.prisma.user.findUnique({
                where :{email}
            })


            
            return user
        } catch (error) {
            throw Error("error in Server on Find User By Email")
        }
    }

    async FindUserByid(id:string){
        try {

            const user = await this.prisma.user.findUnique({
                where : {id:+id}
            })

            if(!user){
                return false
            }

            return user
            
        } catch (error) {
            throw Error("Error in Server on Find User By Id")
        }
    }
}
