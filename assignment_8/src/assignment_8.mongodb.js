use ("libraryDB");
//1  

// db.createCollection("books",{
//     validator : {
//         $jsonSchema :{
//             bsonType : "object",
//             required : ["title","author", "year",'genres'],
//             properties : {
//                 title : {
//                     bsonType : "string",
//                     minLength : 3,
//                     description : "The title of the book at lest 3 "
//                 },
//                 author: {
//                     bsonType : "string",
//                     minLength : 3,
//                     description : "The  author of the book at lest 3 "
//                 },
//                 year : {
//                     bsonType : "number",
               
//                 },
//                 genres : {
//                     bsonType : "array",
//                     items : {bsonType : "string"}
//                 },  

//             }
//         }
//     }
// })

//2
// db.authors.insertOne({name : "Author1",
//     nationality : 'british'
// })

//3

// db.createCollection("logs",{capped :true,size :1000})

//4
// db.books.createIndex({title:1},{unique : true,name : "title_index"})

//5
// db.books.insertOne({
//     title: "Senga",
//     author : "Ahmed Khaled",
//     year :2012,
//     genres : ["Fantasy"]
// })

//6
// db.books.insertMany([
//   {
//     title: "The Quantum Enigma",
//     author: "Sarah Jenkins",
//     year: 1998,
//     genres: ["Sci-Fi", "Mystery"]
//   },
//   {
//     title: "Echoes of Eternity",
//     author: "David Vance",
//     year: 2005,
//     genres: ["Fantasy", "Adventure"]
//   },
//   {
//     title: "Silicon Valley Diaries",
//     author: "Alex Mercer",
//     year: 2018,
//     genres: ["Biography", "Technology"]
//   },
//   {
//     title: "The Martian Paradox",
//     author: "Elena Rostova",
//     year: 2021,
//     genres: ["Sci-Fi", "Thriller", "Action"]
//   },
//   {
//     title: "Ocean's Depth",
//     author: "Michael Chang",
//     year: 1995,
//     genres: ["Documentary", "Nature"]
//   },
//   {
//     title: "Shadows of Kyoto",
//     author: "Kenji Sato",
//     year: 2010,
//     genres: ["Historical", "Fiction"]
//   },
//   {
//     title: "Data Structures Unleashed",
//     author: "Robert King",
//     year: 2023,
//     genres: ["Education", "Technology", "Programming"]
//   },
//   {
//     title: "The Alchemist's Secret",
//     author: "Julia Navarro",
//     year: 2001,
//     genres: ["Fantasy"] // أراي فيها عنصر واحد عشان تتست بيها
//   },
//   {
//     title: "Beyond the Stars",
//     author: "Sarah Jenkins",
//     year: 2008,
//     genres: ["Sci-Fi", "Space", "Adventure"]
//   },
//   {
//     title: "Mind Over Matter",
//     author: "Dr. Alan Grant",
//     year: 1989,
//     genres: ["Psychology", "Science"]
//   },
//   {
//     title: "The Lost Empire",
//     author: "David Vance",
//     year: 2015,
//     genres: ["Historical", "Adventure"]
//   },
//   {
//     title: "Cyberpunk: Neon City",
//     author: "Chris Weaver",
//     year: 2020,
//     genres: ["Sci-Fi", "Cyberpunk", "Action"]
//   }
// ])

//7
// db.logs.insertOne({
//     book_id : "699a38f9091e56d21e37a94a",
//     action : "borrowed",
//     createdAt : new Date ()
// })

//8
// db.books.updateOne({title : "Future World"},{
//     $set : {
//         year : 2022
//     }

// })

//9 

// db.books.find({title: "Brave New World"})

//10
//  db.books.find({
//     year : {$gte : 1990 , $lte : 2010}
//  })

//11
// db.books.find({
//     genres : { $regex : /Science Fiction/}
// })

// 12. Skip the first two books, limit the results to the next three, sorted by year in descending
//order.

 //db.books.find().sort({year : -1}).skip(2).limit(3)
 
// //13
// db.books.find({
//     year : {$type : "int"}
// })


//14

// db.books.find({
//     genres : {$nin : ["Science Fiction","Horror"]}
// })

//15 
// db.books.deleteMany({
//     year : {$lt :2000}
// })

//16

// db.books.aggregate([
//     { $match: {
//           "year" : {$gt :2000}
//         } },
//     {
//         $sort: {
//           year: -1
//         }
//     }
// ]) 

//17 
// db.books.aggregate([
//     {$match: {
//        "year" : {$gt :2000}
//     }},
//     {
//         $project: {
//           _id : 0,
//           title : 1,
//           author :1,
//           year : 1
//         }
//     }
// ])

//18. Using aggregation functions,break an array of genres into separate documents.

// db.books.aggregate([ 
//     {
//     $match: {
//       "genres.1":{$exists :true}
//     }},
//     {
//         $unwind: "$genres"
//     }
// ])

//19
// db.logs.aggregate([
//     {
//         $lookup: {
//       from: "books",
//       localField: "book_id",
//       foreignField: "_id",
//       as: "book_details"
//     }
// },
//     {
//         $project: {
//           _id :0,
//           action : 1,
//           "book_details.title" : 1,
//           "book_details.author" : 1,
//           "book_details.year" : 1

//         }
//     }
// ])


