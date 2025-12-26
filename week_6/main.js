const express = require("express");
const app = express();
const port = 3000;

const mysql2 = require('mysql2');

const db = mysql2.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: "root",
    password: "",
    database: "retail_store"
});

db.connect((err) => {
    if (err) {
        console.log(`fail to connect with database server`);
    } else {
        console.log(`connect to database succeeded `);
    }
});

//2-  Add a column “Category” to the Products table.
// const addColumn = `ALTER TABLE Products
//                     ADD COLUMN IF NOT EXISTS category VARCHAR (50)`;

// db.execute(addColumn,[],(err,data,fields)=>{
//     if(err){
//         console.log(err.message)
//     }
//     else{
//         console.log("Add Category Table succeed  ")
//     }
// });

const formatTable = `ALTER TABLE Products ROW_FORMAT=DYNAMIC;`;
db.execute(formatTable);

//3-  Remove the “Category” column from Products.

// const delColumn = `ALTER TABLE products 
//                     DROP COLUMN category`;

// db.execute(delColumn,[],(err,data,fields)=>{
//     if(err){
//         console.log(err.message)
//     }
//     else{
//         console.log("DELETE Category Table succeed  ")
//     }
// });


// 4-  Change “ContactNumber” column in Suppliers to VARCHAR (15)

// const editTable = `ALTER TABLE Suppliers 
//                     MODIFY ContactNumber VARCHAR(15)`;

// db.execute(editTable,[],(err,data,fields)=>{
//     if(err){
//         console.log(err.message)
//     }
//     else{
//         console.log(`edit ContactNumber size success `,data)
//     }
// });

//5-  Add a NOT NULL constraint to ProductName  
// const editColumn = `ALTER TABLE Products 
//                      CHANGE COLUMN ProductName ProductName VARCHAR(50) NOT NULL;`

// db.execute(editColumn,[],(err,data,fields)=>{
//     console.log(err? err.message : "success") 
// })

//6 insert 

//a
// const insertRow = `INSERT INTO suppliers (SupplierName, ContactNumber)
//                         VALUES("FreshFoods","01001234567")`
// db.execute(insertRow,[],(err,data,fields)=>{
//     console.log(err?err.message:console.table(data))
// });
//b  
const getSuppId = `SELECT supplierID FROM suppliers
                            WHERE SupplierName = "FreshFoods";`
db.execute(getSuppId, [], (err, data) => {
    err ? console.log(err.message) :
        console.table(data);
});

// const insertToProduct = `INSERT INTO products (ProductName,price,StockQuantity,supplier_id) 
//                         VALUES("Milk",15.00,50,0),
//                         ("Bread",10.00,30,0),
//                         ("Eggs",20.00,40,0);
//                         `
// db.execute(insertToProduct,[],(err,data)=>{
//     err?console.log(err.message): 
//         console.table(data);
// });

//c Add a record for the sale of 2 units of 'Milk' made on '2025-05-20

const getProductId = `SELECT ProductID  FROM products
                            WHERE ProductName = "Milk";`
db.execute(getProductId, [], (err, data) => {
    err ? console.log(err.message) :
        console.table(data);
});

const insertSales = `INSERT INTO Sales (product_id,SalesDate,QuantitySold)
                        VALUES (25,'2025-05-20',2);`;

// db.execute(insertSales,[],(err,data)=>{
//     err?console.error(err):
//         console.table(data);
// })


//7-  Update the price of 'Bread' to 25.00.

const upDatePrice = `UPDATE products
                        SET price = 25
                        WHERE ProductName = "Bread"`

// db.execute(upDatePrice,[],(err,data)=>{
//     err?console.error(err):
//         console.table(data);
// });

//8-  Delete the product 'Eggs'

const dltProduct = `DELETE FROM Products 
                    WHERE ProductName ='Eggs' `;

// db.execute(dltProduct,[],(err,data)=>{
//     err?console.error(err):
//         console.table("delete success",data);
// });


// 9-  Retrieve the total quantity sold for each product

const sqlQuery = `SELECT p.ProductID , p.ProductName , 
                    SUM(s.QuantitySold) AS TotalQuantitySold
                      FROM Products p LEFT JOIN Sales s
                        ON p.ProductID = s.product_id
                            GROUP BY  p.productID , p.ProductName`;

// db.execute(sqlQuery,[],(err,data)=>{
//     err?console.error(err):
//         console.table(data);
// });

const QryHStock = `SELECT ProductName, StockQuantity 
                    From Products 
                    ORDER BY StockQuantity DESC LIMIT 1`

//  db.execute(QryHStock,[],(err,data)=>{
//     err?console.error(err):
//         console.table(data);
// });


//11- Find suppliers with names starting with 'F'
    const FindSql = `SELECT * FROM Suppliers WHERE SupplierName like 'f%' `;

//      db.execute(FindSql,[],(err,data)=>{
//      err?console.error(err):
//         console.table(data);
// });

//12- Show all products that have never been sold
const getPrd = `SELECT p.productID,p.ProductName ,StockQuantity FROM
                    Products p LEFT JOIN sales s 
                    ON p.productID = s.product_id
                    WHERE s.product_id IS NULL;`;

//      db.execute(getPrd,[],(err,data)=>{
//      err?console.error(err):
//         console.table(data);
// });

//13- Get all sales along with product name and sale date

const query = `SELECT s.* ,p.productName FROM 
                sales s INNER JOIN products p 
                    ON p.ProductID= s.product_id`;

//      db.execute(query,[],(err,data)=>{
//      err?console.error(err):
//         console.table(data);
// });

//14- Create a user “store_manager” and give them SELECT, INSERT, and UPDATE

 const createUser = `CREATE USER IF NOT EXISTS 'store_manager'@'localhost' IDENTIFIED BY 'pass';`

//      db.execute(createUser,[],(err,data)=>{
//      err?console.error(err):
//         console.table(data);
// });

const UserPermeation = `GRANT SELECT, INSERT, UPDATE  ON retail_store.* TO 'store_manager'@'localhost';`

//      db.execute(UserPermeation,[],(err,data)=>{
//      err?console.error(err):
//         console.table(data);
// });
const showUserPermeation = `SHOW GRANTS FOR 'store_manager'@'localhost';`
     db.execute(showUserPermeation,[],(err,data)=>{
     err?console.error(err):
        console.table(data);
});

//15- Revoke UPDATE permission from “store_manager”

 const RvkFromUser = `REVOKE UPDATE ON retail_store.* FROM 'store_manager'@'localhost'`;

//       db.execute(RvkFromUser,[],(err,data)=>{
//      err?console.error(err):
//         console.table(data);
// });

// 16- Grant DELETE permission to “store_manager

const deletePermeation = `GRANT DELETE  ON retail_store.sales TO 'store_manager'@'localhost';`

//      db.execute(deletePermeation,[],(err,data)=>{
//      err?console.error(err):
//         console.table(data);
// });

app.listen(port, 'localhost', () => {
    console.log("server is running  ");
})