import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {

    @IsOptional()
    @IsInt()
    userId? : number;  
  
    @IsOptional()
    @IsInt()
    resourceId: number;

    @IsDateString()
    startTime: Date;

    @IsDateString()
    endTime: Date;

    @IsOptional()
    @IsString()
    status?: string = "booked";
}
