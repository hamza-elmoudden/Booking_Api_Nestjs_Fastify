import { Module } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ResourceController],
  providers: [ResourceService],
  imports: [PrismaModule]
})
export class ResourceModule {}
