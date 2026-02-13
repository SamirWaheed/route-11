
import {
    user
} from "../../database/models/index.js";

const checkUser = async (email) => {
    const count = await user.count({
        where: {
            email        }
    });
    if (count > 0) {
        const error = new Error("User Already Exist");
        error.statusCode = 409;
        throw error;
    }
}
export async function addUser(body) {

    const {
        userName,
        userEmail,
        userPassword,
        userRole
    } = body;
    console.log(body);

    await checkUser(userEmail);

    const newUser = user.build({
        name: userName,
        email: userEmail,
        password: userPassword,
        role: userRole
    })
    await newUser.save();
    return newUser;
}

export async function loginUser(body) {
    const {
        userEmail,
        userPassword
    } = body;
    const userFound = await user.findOne({
        where: {
            email: userEmail
        }
    });
    if (!userFound) {
        const error = new Error("User Not Found");
        error.statusCode = 404;
        throw error;
    }
    if (userFound.password !== userPassword) {
        const error = new Error("Invalid Password");
        error.statusCode = 401;
        throw error;
    }
    return {
        name: userFound.name,
        email: userFound.email,
        role: userFound.role
    };
}

export async function updateUser(id, body) {

    const userFound = await user.findByPk(id);  
    if (!userFound) {
        const error = new Error("User Not Found");
        error.statusCode = 404;
        throw error;
    }

    if (body.userEmail) {
        const isExist = await user.findOne({
            where: {
                email: body.userEmail
            }
        });

        if (isExist && isExist.id !== userFound.id) {
            const error = new Error("Email conflict");
            error.statusCode = 409;
            throw error;
        }
    }

     return userFound.update(body,{where:{id}});

  
};

export async function getUserByEmail(body) {
    const userFound = await user.findOne({
        where: {
            email: body.userEmail
        }
    });     
    if (!userFound) {
        const error = new Error("User Not Found");
        error.statusCode = 404;
        throw error;
    }
    return userFound;
}   ;

 export async function getUserById(id) {
    const userFound = await user.findByPk(id,{
        attributes: { exclude :['password','role']}
    });
    if (!userFound){
        const error = new Error("User Not Found");
        error.statusCode = 404;
        throw error;
    }
    return userFound;
}