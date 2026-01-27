import mysql2 from 'mysql2/promise';

const connection = await mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blogapp',
    port: 3306,
}).catch((err) => {
    console.error("DB Connection Error:", err.message);
});

export default connection;