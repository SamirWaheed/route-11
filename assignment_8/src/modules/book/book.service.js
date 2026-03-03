import { Int32 } from "mongodb";
import {Book} from "../../database/models/index.js";
import authorRouter from "../author/author.controller.js";

export async function  newBook (body){
     const {bookTitle ,bookAuthor,year,genres} = body;
    const isExist = await Book.findOne({title :{$eq: bookTitle}});
    if (isExist){
        const error = new Error("Book already Exist in library");
        error.statusCode = 409;
        throw error
    }
    const result = await Book.insertOne({
        title : bookTitle,
        author : bookAuthor,
        year : year,
        genres : genres
    })
    return result
}

export async function createIndex(body){
    const {field,options} = body;
   const result = await Book.createIndex(field,options);
    return result
};

export async function  insertBook (body){
     const {bookTitle ,bookAuthor,year,genres} = body;
    const isExist = await Book.findOne({title :{$eq: bookTitle}});
    if (isExist){
        const error = new Error("Book already Exist in library");
        error.statusCode = 409;
        throw error
    }
    console.log(body);
    const result = await Book.insertOne({
        title : bookTitle,
        author : bookAuthor,
        year : Number(year),
        genres : genres
    })
    return result
}

export async function  manyBooks(body){
   
    console.log(body);


    if (!Array.isArray(body)) {
        throw new Error("Input must be an array of books");
    }
    const booksToInsert = body.map(book => ({
        title: book.bookTitle,
        author: book.bookAuthor,
        year: Number(book.year),
        genres: book.genres
    }));

    const result = await Book.insertMany(booksToInsert);

    return result
}

export async function updateOne (body,title){
    const {year} = body;
    const isExist = await Book.findOne({title :{$eq: title}});
    if (!isExist){
        const error = new Error("Book is Not Exist in library");
        error.statusCode = 404;
        throw error
    }
    const result = await Book.updateOne(
        {title :title},{
        $set:{
            year :year 
        }
    })
    return result ;
    
}

export async function findOne (title){
    
    const result = await Book.findOne({title : {$eq : title}});
    if (!result){
         const error = new Error("Book is Not Exist in library");
        error.statusCode = 404;
        throw error
    }
    return result
}

export async function  findBooks(query) {
    const {from,to} = query;
    if (!from || !to){
         const error = new Error("from and to are required");
        error.statusCode = 400;
        throw error
    }
    const books = await Book.find({
        year: {
            $gte: Number(from),
            $lte: Number(to)
        }
    }).toArray();
    return books    
}

export async function findBooksByGenre(genre) {

    const books = await Book.find({
        genres: {
            $regex: new RegExp(genre, 'i')    
        }
    }).toArray();
    return books    
};

export async function findBooksWithPagination() {

    const books = await Book.find().sort({year : -1}).skip(2).limit(3).toArray();
    return books    
}

export async function findBooksWithTypeInt() {

    const books = await Book.find({
        year : {$type : "int"}
    }).toArray();
    return books    
}
export async function excludeGenre(genre) {

    const books = await Book.find({
        genres: { $nin: [genre] }
    }).toArray();
    return books    
}

export async function deleteBooksBeforeYear(year) {
    const result = await Book.deleteMany({
        year: { $lt: Number(year) }
    });
    return result;
};

export async function aggregateBooksAfterYear(year) {
    const result = await Book.aggregate([
        {$match : {
            year : {$gt : Number(year)}
        }},
        {
            $sort : {
                year : -1
        }
        }
    ])
    return result.toArray();
}

export async function aggregateAndProjection(year) {
    const result = await Book.aggregate([
        {
            $match : {
            year : {$gt : Number(year)}
        }},
        {
            $sort : {
                year : -1
        }},
        {
            $project:{
            _id : 0,
            title:1,
            author: 1,
            year : 1
        }}
        
        
    ])
    return result.toArray();
}

export async function unwindGenres() {
    const result = await Book.aggregate([
        {
            $match: {
                "genres.1": { $exists: true }   
            }
        },
        {
            $unwind: "$genres"  
        }
    ])
    return result.toArray();
}