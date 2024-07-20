import mysql from 'mysql2/promise';

// Create a connection to the database
const connection = mysql.createPool({
  host: 'test-referrals.cvgqg8c84kbe.us-east-1.rds.amazonaws.com', // Replace with your database host
  user: 'blox_13031d8d',      // Replace with your database user
  password: 'Dr&72zx31Vk3z786$b',  // Replace with your database password
  database: 'test-referrals',    // Replace with your database name
  ssl: 'Amazon RDS',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default connection;