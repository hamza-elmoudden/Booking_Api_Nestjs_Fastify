import { Controller, Get,HttpStatus,Res } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { FastifyReply } from 'fastify';
import { Resource } from '@prisma/client';
import { ApiResponse } from '@nestjs/swagger';
import { ResourceResponseDto } from './Dto/resourceresponse.dto';



@Controller('resource')
export class ResourceController {
    constructor(private readonly resourceservice:ResourceService){}


    @Get()
    @ApiResponse({
        status: 200,
        description: 'Data Get successfully.',
        type: [ResourceResponseDto],
      })
    async GetAllResource(@Res() reply:FastifyReply):Promise<Resource[]>{
        try {
            const resou = await this.resourceservice.GetAllResource()

            return reply.status(HttpStatus.OK).send(resou)
        } catch (error) {
            return reply.status(HttpStatus.SERVICE_UNAVAILABLE).send({
                message:"Error On Server"
            })
        }
    }
}
