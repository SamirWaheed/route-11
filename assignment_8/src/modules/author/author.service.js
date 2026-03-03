import {Db} from "../../database/db.connection.js"

export async function addAuthor(body){

    const {authorName,nationality} = body;
    // console.log(authorName);
    if (authorName === undefined || authorName.trim() === "") {
        const error  = new Error (" Author Name require ");
        error.statusCode = 400;
        throw error;
    }

    if (nationality === undefined || nationality.trim() === "") {
        const error  = new Error (" Author Nationality require ");
        error.statusCode = 400;
        throw error;
    }
console.log(body);
    const result = await Db.collection("author").insertOne({
        name : authorName.trim().toLowerCase(),
        nationality : nationality.trim().toLowerCase()
    });
   
    return result


}