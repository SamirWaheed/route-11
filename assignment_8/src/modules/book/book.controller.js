import {
    Router
} from "express";
import * as bookService from "./book.service.js";

const bookRouter = Router();

bookRouter.post('/new-book', async (req, res, next) => {
    try {
        const book = await bookService.newBook(req.body);
        res.status(201).json({
            message: "Book added successfully",
            data: book
        })

    } catch (error) {
        next(error);
    }
})

bookRouter.post('/create-index', async (req, res, next) => {
    try {
        const index = await bookService.createIndex(req.body);
        res.status(201).json({
            message: "Index created successfully",
            data: index
        })
    } catch (error) {
        next(error);
    }
});

bookRouter.post('/insert-book', async (req, res, next) => {
    try {
        const book = await bookService.insertBook(req.body);
        res.status(201).json({
            message: "Book added successfully",
            data: book
        })

    } catch (error) {
        next(error);
    }
})


bookRouter.post('/many-books', async (req, res, next) => {
    try {

        const book = await bookService.manyBooks(req.body);
        res.status(201).json({
            message: "Book added successfully",
            data: book
        })

    } catch (error) {
        next(error);
    }
})

bookRouter.patch('/update-one/:title', async (req, res, next) => {
    try {

        const book = await bookService.updateOne(req.body, req.params.title);
        res.status(201).json({
            message: "Book updated successfully",
            data: book
        })

    } catch (error) {
        next(error);
    }
});



bookRouter.get("/title", async (req, res, next) => {
    try {
        const title = req.query.title;
        const book = await bookService.findOne(title);
        res.status(200).json({
            message: "Book updated successfully",
            data: book
        })
    } 
    catch (error){
        next(error)
    }

})

bookRouter.get("/books", async (req, res, next) => {
    try {
        const book = (await bookService.findBooks(req.query));
        res.status(200).json({
            message: "Books retrieved successfully",
            data: book
        })
    }
    catch (error){
        next(error)
    }
});

bookRouter.get("/books-by-genre", async (req, res, next) => {
    try {
        const genre = req.query.genre;
        const books = await bookService.findBooksByGenre(genre);
        res.status(200).json({
            message: "Books retrieved successfully",
            data: books
        })
    }
    catch (error){
        next(error)
    }
});

bookRouter.get("/skip-limit", async (req, res, next) => {
    try {
        const books = await bookService.findBooksWithPagination();
        res.status(200).json({
            message: "Books retrieved successfully",
            data: books
        })
    }
    catch (error){
        next(error)
    }
});

bookRouter.get("/type-int", async (req, res, next) => {
    try {
        const books = await bookService.findBooksWithTypeInt(); 
        res.status(200).json({
            message: "Books retrieved successfully",
            data: books 
        })
    }
    catch (error){
        next(error)
    }
});

bookRouter.get("/exclude-genre", async (req, res, next) => {
    try {
      
        const books = await bookService.excludeGenre(req.query.genre);
        res.status(200).json({
            message: "Books retrieved successfully",
            data: books
        })
    }
    catch (error){
        next(error)
    }
});

bookRouter.delete("/delete-books-before-year", async (req, res, next) => {
    try {
        const result = await bookService.deleteBooksBeforeYear(req.query.year);
        res.status(200).json({
            message: "Books deleted successfully",
            data: result
        })
    }
    catch (error){
        next(error)
    }
})

bookRouter.get("/aggregate-projection", async (req, res, next) => {
    try {
        const result = await bookService.aggregateAndProjection(req.query.year);
        res.status(200).json({
            message: "Books retrieved successfully",
            data: result
        })
    }
    catch (error){
        next(error)
    }
})

bookRouter.get("/unwind", async (req, res, next) => {
    try {
        const result = await bookService.unwindGenres();
        res.status(200).json({
            message: "Books retrieved successfully",
            data: result
        })
    }   
    catch (error){
        next(error)
    }      
})

export default bookRouter