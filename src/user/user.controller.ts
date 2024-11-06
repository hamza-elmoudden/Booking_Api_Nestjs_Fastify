import { Body, Controller, Post, Res ,HttpStatus} from '@nestjs/common';
import { UserService } from './user.service';
import { FastifyReply } from 'fastify';
import { CreateUserDto } from './Dto/user.creat.dto';
import { ApiResponse } from '@nestjs/swagger';
import { UsergResponseDto } from './Dto/userresponse.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userserivec:UserService){}

    @Post()
    @ApiResponse({
        status: 200,
        description: 'Data Get successfully.',
        type: UsergResponseDto,
      })
    async AddUser(@Res() reply: FastifyReply , @Body() data:CreateUserDto){
        return reply.status(400).send("Not Allow This Demo Api")
        try {
            let user: boolean | { name: string; id: number; email: string; password: string}

            user = await this.userserivec.FindUserByEmail(data.email)

            if(user){
                return reply.status(HttpStatus.FOUND).send({
                    message:"User existing",
                    data:data.email
                    
                })
            }

            user =  await this.userserivec.AddUser(data)

            if(!user){
                return reply.status(HttpStatus.CONFLICT).send({
                    message:"Error On Create User"
                })
            }

            return reply.status(HttpStatus.OK).send({
                message:"User Create",
                data : user
            })
        } catch (error) {
            return reply.status(HttpStatus.SERVICE_UNAVAILABLE).send({
                success : false,
                message:"Error in Server"
            })
        }
    }
}

