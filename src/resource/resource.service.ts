import { Injectable } from '@nestjs/common';
import { Resource } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResourceService {
    constructor(private readonly prism:PrismaService){}



    async GetAllResource():Promise<Resource[]>{
        try {
            const resource = await this.prism.resource.findMany()

            return resource
            
        } catch (error) {
            throw Error("Error Server On Resource")
        }
    }
    
}
