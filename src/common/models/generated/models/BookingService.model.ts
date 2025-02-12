import { IsString, IsDefined, IsInt } from "class-validator";
import { Service, Booking } from "./";

export class BookingService {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsInt()
    qtd!: number;

    @IsDefined()
    totalPrice!: number;

    @IsDefined()
    @IsString()
    serviceId!: string;

    @IsDefined()
    service!: Service;

    @IsDefined()
    @IsString()
    bookId!: string;

    @IsDefined()
    booking!: Booking;
}
