import express from "express" ;
import bootStrap from "./app.js";
const app = express ();
const port = 8000;

bootStrap(app);

app.listen(port,()=>{
    console.log("Tmam Yaa Fandemmmm");
});