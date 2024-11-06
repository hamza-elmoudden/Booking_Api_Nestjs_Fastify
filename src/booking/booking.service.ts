import { Injectable } from '@nestjs/common';
import { Booking, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from './Dto/creatbooking.dto';

@Injectable()
export class BookingService {
    constructor(private readonly prisma: PrismaService) { }

    async GetAllBookingonUser(user_id: string): Promise<Booking[]> {
        try {
            const bookings = await this.prisma.booking.findMany({
                where: { userId: +user_id },
                include: {

                    user: {
                        select: {
                            id: true,
                            email: true,
                            name: true
                        }
                    },
                    resource: true
                },


            })

            return bookings
        } catch (error) {
            throw Error("Error On The Get Booking !")
        }
    }

    async AddBooking(data: CreateBookingDto): Promise<Booking | number> {

        try {
            const existingBooking = await this.prisma.booking.findFirst({
                where: {
                    resourceId: data.resourceId,
                    OR: [
                        {
                            startTime: {
                                lte: new Date(data.endTime),
                            },
                            endTime: {
                                gte: new Date(data.startTime),
                            },
                        },
                    ],
                },
            });

            // If an existing booking is found, return an error
            if (existingBooking) {
                return 0;
            }


            const booking = await this.prisma.booking.create({

                data: {
                    startTime: new Date(data.startTime),
                    endTime: new Date(data.endTime),
                    status: data.status ?? "booked",
                    userId: data.userId,
                    resourceId: data.resourceId
                }
            });


            return booking

        } catch (error) {
            throw Error("Error On the Add Booking !")
        }
    }

    async RemoveBooking(id: string, userId: string): Promise<Booking> {
        try {

            const booking = await this.prisma.booking.delete({
                where: { id: +id, userId: +userId }
            })

            return booking

        } catch (error) {
            throw Error("Error On The Remove Booking !")
        }
    }

    async FindBookingById(id: string): Promise<Booking> {
        try {

            const booking = await this.prisma.booking.findUnique({
                where: { id: +id }
            })

            return booking

        } catch (error) {
            throw Error("Error On the Find Booking !")
        }
    }
}
