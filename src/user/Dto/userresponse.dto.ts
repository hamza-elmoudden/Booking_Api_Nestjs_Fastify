import { ApiProperty } from '@nestjs/swagger';

export class UsergResponseDto {
  @ApiProperty({ description: 'The unique identifier of the User' })
  id: string;
  
  @ApiProperty({ description: 'The  identifier of the Name' })
  name :string
  
  @ApiProperty({ description: 'The unique identifier of  the User' })
  email :string

  @ApiProperty({ description: 'The  identifier of the Start Time On Booking' })
  password :string
  
 
}
