import { ApiProperty } from '@nestjs/swagger';

export class BookingResponseDto {
  @ApiProperty({ description: 'The unique identifier of the Booking' })
  id: string;
  
  @ApiProperty({ description: 'The unique identifier of the User' })
  userId :string
  
  @ApiProperty({ description: 'The unique identifier of  the Resource' })
  resourceId :string

  @ApiProperty({ description: 'The  identifier of the Start Time On Booking' })
  startTime :Date
  
  @ApiProperty({ description: 'The  identifier of the End Time On Booking' })
  endTime :Date
  
  @ApiProperty({ description: 'The  identifier of the Status On Booking' })
  status:string  
}
