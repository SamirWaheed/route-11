const path = require('path');
const fs = require('fs');

const express = require("express");
const app = express();
const port = 3000;

const userPath = path.resolve('./data/users.json');

let users = [];
try {
    users = JSON.parse(fs.readFileSync(userPath, 'utf-8'))
} catch (error) {
    users = [];
};

function saveUsers() {
    try {
        fs.writeFileSync(userPath, JSON.stringify(users));
    } catch (error) {
        console.log("witting error ", error)
    };

};


//1. Create an API that adds a new user to your users stored in a JSON file.
// const userData = (req, res, next) => {
//     let data = '';
//     req.on("data", (chunk) => {
//         data += chunk
//     });
//     req.on("end", () => {
//         req.body = JSON.parse(data);
//         console.log(req.body);
//         next();
//     });

// }
app.use(express.json());

app.post('/user', (req, res, next) => {

    const {id,user_name,email,pass,age,address} = req.body;

    const user = users.find((usr)=>{
        return usr.email === email;
    });

    if (!user){

        const newUser = {id,user_name,email,pass,age,address};
        users.push(newUser);
        saveUsers();

        return res.status(201).json("Add new  user ✅ ");
    }
    else{

        return res.status(409).json("user already exist in DataBase");
    }

});

//2. Create an API that updates an existing user's name, age

app.patch('/user/:id',(req,res,next)=>{
    let usrId = Number(req.params.id);
    
    const user = users.find((usr)=>{
        return usr.id === usrId;
    })
    
    if(!user){
        res.status(404).json("user not found 🤦‍♂️");
    }
    
        let propUpdate = ["user_name","email","pass","age","address"];

        for (let prop of propUpdate) {
            if (req.body[prop] !== undefined) {
                user[prop] = req.body[prop];
            }
        }
        saveUsers();
        res.status(200).json("User updated ✅");
    
});

//Create an API that deletes a User by ID
app.delete('/user/:id',(req,res,next)=>{
     let usrId = Number(req.params.id);
    
    const userIndex = users.findIndex((usr)=>{
        return usr.id === usrId;
    })
    
    if(userIndex === -1){
        res.status(404).json("user not found 🤦‍♂️");
    };
    users.splice(userIndex,1);
    saveUsers();
    res.json("user Deleted successfully 💯");

});
//Create an API that gets a user by their name.
app.get('/user/getByName',(req,res,next)=>{
    let name = req.query.name;
    if (!name) {
        return res.status(400).json("Please provide a name in the query");
    }
    const user = users.find((usr)=>{
        return usr.user_name === name;
    })
    if (!user){
         res.status(404).json("Name not found 🤦‍♂️");
    };
    return res.json(user)
})

//5. Create an API that gets all users from the JSON file
app.get('/users',(req,res,next)=>{
    try {
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json(error);
    }
});

//6. Create an API that filters users by minimum age
app.get('/user/filter',(req,res,next)=>{
    let minAge = Number(req.query.age);
    if (!minAge) {
        return res.status(400).json("Please provide a name in the query");
    }
    const filterUser = users.find((usr)=>{
        return usr.age >= minAge;
    })
    if (!filterUser){
         return res.status(404).json("No users found with the given minimum age");
    };
    return res.json(filterUser)
})

//7. Create an API that gets User by ID. 

app.get('/user/:id',(req,res,next)=>{
    let userId = Number(req.params.id);
    if (!userId){
    return res.status(400).json("Please provide a id in the query")
    };

    const user  = users.find((usr)=>{
        return usr.id === userId;
    });

    if(!user){
       return  res.status(404).json("user not found ");
    }
    return res.json(user);

})

app.listen(port, "localhost", () => {
    console.log("Tmam 👌");
})