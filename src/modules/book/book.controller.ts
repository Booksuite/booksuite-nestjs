import { BookService } from './book.service';
import { BookPayload } from './book.interface';
import { Body, Param, Controller, Post, Get, Res, Patch, Delete } from '@nestjs/common';
import { Response } from 'express';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService){}

    @Post("createBook")
    async addBook(@Body() bookData: BookPayload, @Res() res: Response) {
        try {
            if (Object.values(bookData).length === 9) {
                const createdData = await this.bookService.createBook(bookData);
                
                if(!!createdData) {return res.status(201).json(createdData)}
            }
            return res.status(400).json({ message: "Data type is incorrectly formed." });
        } catch (error) {
            return res.status(500).json({ message: `(Internal Server Error) on creating book data: ${error}` });
        }
    }

    @Get("getBook/:id")
    async getBookByID(@Param("id") id: string, @Res() res: Response) {
        const returnedData = await this.bookService.getBook(parseInt(id));
        if (returnedData) {
            return res.status(200).json(returnedData);
        }
        return res.status(400).json({ message: "Data not found." });
    }

    @Patch("updateBook/:id")
    async updateBookData(@Param("id") id: string, @Body() updatedData: BookPayload, @Res() res: Response) {
        try {
            const newData = await this.bookService.updateBook(updatedData,parseInt(id));
            return res.status(200).json(newData);
        } catch (error) {
            return res.status(500).json({ message: `(Internal Server Error) on updating book data: ${error}` });
        }
    }

    @Delete("deleteBook/:id")
    async deleteBook(@Param("id") id: string, @Res() res: Response) {
        const deletedData = await this.bookService.deleteBook(parseInt(id));
        if (deletedData) {
            return res.status(200).json({ message: `Book deleted successfully.` });
        }
        return res.status(400).json({ message: `Book not found with id(${id})` });
    }
}
