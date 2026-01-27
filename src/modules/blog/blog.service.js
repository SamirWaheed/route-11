import connection from "../../database/connection.js";
import {
    splitName
} from "../../middleware/index.js";

export async function createBlog(body) {

    const {
        userName,
        ...data
    } = body;
    const othersData = {
        ...data
    };

    if (userName) {
        const [first, mid, last] = splitName(userName);
        othersData.firstName = first;
        othersData.midName = mid;
        othersData.lastName = last;
    }

    const {
        firstName,
        midName,
        lastName,
        blogTitle,
        content
    } = othersData;

    const selectID = `SELECT userID FROM users
     WHERE firstName = ? AND midName =? AND lastName = ? `

    const fullName = [firstName, midName, lastName]
    const [users] = await connection.execute(selectID, fullName);

    if (users.length === 0) {
        const error = new Error("user Not found")
        error.statusCode = 404;
        throw error
    }
    if (users.length > 1) {
        const error = new Error("conflict users")
        error.statusCode = 409;
        throw error
    };
    const userId = users[0].userID;

    const blogQuery = ` INSERT INTO blogs (title,b_content,id_usr) VALUES (?,?,?) `;
    const values = [blogTitle, content, userId];
    const [result] = await connection.execute(blogQuery, values);

    if (result.affectedRows === 0) {
        const error = new Error("Failed to create blog")
        error.statusCode = 501;
        throw error;
    }
    return result;

}

export async function editOnBlog(body, id) {

    const data = {
        ...body
    };
    const allowedData = ['blogTitle', 'content'];

    const filterData = Object.keys(data).filter((key) => {
        return allowedData.includes(key);
    });

    if (!filterData.length) {
        const error = new Error("Not valid Data To Update ");
        error.statusCode = 404;
        throw error;
    };

    const columnMap = {
        blogTitle: "title",
        content: "b_content"
    }
    const setClause = allowedData.map(key => `${columnMap[key]}=?`).join(', ')
    // allow[key] ==> blogTitle
    // column[blogTitle] = ?;

    const values = allowedData.map(val => data[val]);
    values.push(id);
    const editQuery = `UPDATE blogs SET ${setClause} WHERE blog_id = ? `

    const [result] = await connection.execute(editQuery, values);

    if (result.affectedRows === 0) {
        const error = new Error("User not found");
        error.status = "Fail";
        error.statusCode = 404;
        throw error;
    }
    return result ;
}