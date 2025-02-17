// import mysql, { Connection, QueryError } from "mysql2";
import mysql, { Pool, PoolConnection, QueryError } from 'mysql2/promise';
import dotenv from "dotenv";
dotenv.config();

console.log("Attempting to connect with:", {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  port: process.env.PORT,
});

// const connection: Connection = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   database: process.env.MYSQL_DATABASE,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   // port: process.env.PORT,
//   port: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
//   multipleStatements: true,
// });

// connection.connect((err: QueryError | null) => {
//   if (err) {
//     throw err;
//   } else {
//     console.log("mysql connected");
//   }
// });

// export default connection;
// Create a connection pool
const pool: Pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
  waitForConnections: true,
  connectionLimit: 10, // Adjust based on your needs
  queueLimit: 0,
  connectTimeout: 10000,
});

pool.getConnection()
  .then((connection: PoolConnection) => {
    console.log('MySQL connected');
    connection.release();
  })
  .catch((err: QueryError) => {
    console.error('Error connecting to MySQL:', err);
  });

// Export the pool for use in other parts of your application
export default pool;
// module.exports = connection
