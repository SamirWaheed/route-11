import {Db} from '../db.connection.js' 

  await Db.createCollection("books",{
    validator : {
        $jsonSchema :{
            bsonType : "object",
            required : ["title","author", "year",'genres'],
            properties :{
                title :{
                    bsonType : "string",
                    minLength : 3,
                    description : "The title of the book at lest 3 "
                },
                author :{
                    bsonType :"string",
                     minLength : 3,
                    description : "Author Name at lest 3 "
                },
                year : {
                    bsonType : "number",
               
                },
                genres : {
                    bsonType : "array",
                    items : {bsonType : "string"}
                }  
            }
        }

    }
})
const Book = Db.collection("books")
export default Book