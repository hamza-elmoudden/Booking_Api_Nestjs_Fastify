import { Body, Controller, Get, Post, UseGuards, Request,HttpStatus,Res, Delete, Param } from '@nestjs/common';
import { BookingService } from './booking.service';
import { FastifyReply } from 'fastify';
import { CreateBookingDto } from './Dto/creatbooking.dto';
import { JwtAuthGuard } from 'src/auth/auth.Guard';
import { Booking } from '@prisma/client';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { BookingResponseDto } from './Dto/bookingResponse.dto';

@Controller('booking')
export class BookingController {
    constructor(private readonly bookingserivec: BookingService) { }


    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Data Get successfully.',
        type: [BookingResponseDto],
      })
    @Get()
    async GetAllbooking(@Res() reply: FastifyReply, @Request() req):Promise<Booking[]>{
        try {
            
            const booking = await this.bookingserivec.GetAllBookingonUser(req.user.userId)
           

            if (!booking) {
                return reply.status(HttpStatus.NOT_FOUND).send({
                    message: "No Booking Find",
                    status: "404"
                })
            }


            return reply.status(HttpStatus.OK).send(booking)
        } catch (error) {

            reply.status(500).send({
                message: "Error On Server Booking"
            })

        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Data Post successfully.',
        type: BookingResponseDto,
      })
    @ApiBody({
        description:"Body Post",
        type:BookingResponseDto
    })
    @Post()
    async AddBooking(@Body() data: CreateBookingDto,@Res() reply: FastifyReply, @Request() req) {
        try {

            
            data.userId = req.user.userId

            const booking = await this.bookingserivec.AddBooking(data)

            if (booking === 0) {
                return reply.status(400).send({
                    massage: `Booking from ${data.startTime} to ${data.endTime} Is Full`
                })
            }

            if (!booking) {
                return reply.status(400).send({
                    massage: "Error On Add Booking !"
                })
            }

            return reply.status(201).send(booking);

        } catch (error) {

            reply.status(500).send({
                message: "Error On Server Booking"
            })

        }

    }


    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Data delelte successfully.',
        type: BookingResponseDto,
      })
    @Delete(":id")
    async DeletBookingonUser(@Res() reply:FastifyReply,@Request() req,@Param("id") id:string){
        try {

            
            const booking = await this.bookingserivec.RemoveBooking(id,req.user.userId)

            if(!booking){
                return reply.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).send({
                    message:"NON AUTHORITATIVE INFORMATION"
                })
            }

            return reply.status(HttpStatus.OK).send({
                message:"Your Bookin is delete",
                data:booking
            })
            
        } catch (error) {
            return reply.status(HttpStatus.SERVICE_UNAVAILABLE).send({
                message:"Error On Server"
            })
        }
    }
}
