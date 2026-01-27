import connection from "../../database/connection.js";
import {createUser} from "../user/user.service.js"
async function checkEmail(inputEmail) {

    const checkQuery = `SELECT 1 FROM users WHERE email = ? LIMIT 1`;
    const [result] = await connection.execute(checkQuery, [inputEmail]);
    return result.length > 0;
};

export async function signUp(input) {

        const {  userEmail } = input;
        const isExist = await checkEmail(userEmail);
        if (isExist) {
            const error = new Error("Email already exists");
            error.status = "Fail";
            error.statusCode = 409;
            throw error;

        }
       return  await createUser(input);
};

export async function logIn(input) {

       const {userEmail,userPassword} = input;
       const query = `SELECT 1 FROM users WHERE email = ? AND usr_pass = ? LIMIT 1 `;
        const params = [userEmail,userPassword];
       const [result] = await connection.execute(query,params);
       if (result.length > 0){
        return result[0];
       }
       else {
        const error = new Error("Invalid Email or Password");
        error.status = "Fail"
        error.statusCode= 401;
        throw error
       }
}