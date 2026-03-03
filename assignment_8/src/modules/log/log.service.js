import {Db} from "../../database/db.connection.js";

export async function createCappedCollection(re) {
   
        
        await Db.createCollection("logs", { capped: true, size: 1048576 });
        return ;
};

export async function insertLog(log) {
        const {bookId, action} = log;
    const logsCollection = Db.collection("logs");
    await logsCollection.insertOne({
        bookId,
        action,
        
    });
    return ;
}
export async function joinLogsWithBooks() {
    const logsCollection = Db.collection("logs");
    const result = await logsCollection.aggregate([
       {
            $addFields: {
                bookIdObj: { $toObjectId: "$bookId" }
            }
        },
        {
                $lookup:{
                        from: "books",
                        localField : "bookIdObj",
                        foreignField : "_id",
                        as : "book_details"
                },

        },
        {
                $project : {
                        _id :0,
                        action : 1,
                        "book_details.title" : 1,
                        "book_details.author" : 1,
                        "book_details.year" : 1
                }
        }
    ]).toArray();
return result;
};
