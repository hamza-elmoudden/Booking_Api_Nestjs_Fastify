import { ApiProperty } from '@nestjs/swagger';
import { JsonArray } from '@prisma/client/runtime/library';

export class ResourceResponseDto {
  @ApiProperty({description:'The unique identifier of the Resource'})
  id: string;
  
  @ApiProperty({description:'The name identifier of the Resource'})
  name :string
  
  @ApiProperty({description:'The type identifier of the Resource'})
  type :string

  @ApiProperty({description:'The availability identifier of the Json Data On Resource'})
  availability :JsonArray
  
 
}
