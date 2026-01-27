import connection from "../../database/connection.js";
import {splitName} from "../../middleware/index.js";

export async function createUser(input) {

  const {
    userName,
    userEmail,
    userPassword,
    userGender,
    userDateOfBirth
  } = input;

  

  const [firstName, midName, lastName] = splitName(userName);

  const params = [firstName, midName, lastName, userEmail, userPassword, userGender, userDateOfBirth];

  for (const element of params) {
    if (element === null || element === undefined) {
      const error = new Error(" Invalid Input");
      error.status = 400;
      throw error;
    }

  }

  const sqlQuery = `INSERT INTO users (
    firstName,midName,lastName,email,usr_pass,gender,DOB
   )
     VALUES(?,?,?,?,?,?,?)`;

  const [result] = await connection.execute(sqlQuery, params);
  if (result.affectedRows === 0 ){
    const error = new Error("create account field ")
    error.statusCode = 500;
    throw error 
  }

  return[ result];


}

export async function updateUser(body, params) {


  const id = params;
  const {
    userName,
    ...othersData
  } = body;
  let fullData = {
    ...othersData
  }
  if (userName) {
    const [first, mid, last] = splitName(userName);
    fullData.firstName = first;
    fullData.midName = mid;
    fullData.lastName = last
  }
  const allowedData = ['firstName','midName','lastName','userEmail','userPassword','userGender','userDateOfBirth','userPhone']

  const filterInputs = Object.keys(data).filter((key) => {
    return allowedData.includes(key)
  })

  
   if (filterInputs.includes('userEmail')) {
    const emailToUpdate = data.userEmail
    const checkUser = ` SELECT 1 FROM users WHERE email = ? AND userID != ? LIMIT 1`;
    const [users] = await connection.execute(checkUser, [emailToUpdate, id]);
      if (users.length > 0) {
        const error = new Error("Email already Exist Before");
        error.status = 409;
        throw error;
    }
  }


  const columnMap = {
    firstName: "firstName", 
    midName: "midName",
    lastName: "lastName",
    userEmail: "email",
    userPassword: "usr_pass",
    userGender: "gender",
    userDateOfBirth: "DOB",
  };

  const setClause = filterInputs.map((key) => {
    return `${columnMap[key]} = ?`
  }).join(", ");

  const values = filterInputs.map(key => fullData[key]);
  values.push(id);

  console.log(values);

  const updateQuery = `UPDATE users SET ${setClause} WHERE userID = ? `
  const [result] = await connection.execute(updateQuery,values);
  
  if (result.affectedRows === 0) {
   
    const error = new Error("User not found");
    error.status = "Fail";
    error.statusCode = 404;
    throw error;
  }
  return result
}

export async function getUserInfo(id) {

  const checkUser = ` SELECT * FROM users WHERE userID = ? LIMIT 1`;
  const [result] = await connection.execute(checkUser, [id]);

  if (result.affectedRows === 0) {
    const error = new Error("user Not Found");
    error.status = "Fail"
    error.statusCode = 404;
    throw error;
  }
  return result[0]  

}

export async function deleteUserById(id) {
  const delQuery = `DELETE FROM users WHERE userID = ?`;
  const [result] = await connection.execute(delQuery,[id]);

  if (result.affectedRows === 0) {
    const error = new Error("user Not Found");
    error.status = "Fail"
    error.statusCode = 404;
    throw error;
  }
  return result
}