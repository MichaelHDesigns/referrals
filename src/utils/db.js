import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'blox-db.cvgqg8c84kbe.us-east-1.rds.amazonaws.com', // Replace with your database host
  user: 'blox_13031d8d',      // Replace with your database user
  password: 'Dr&72zx31Vk3z786$b',  // Replace with your database password
  database: 'blox_db',    // Replace with your database name
  ssl: 'Amazon RDS',     // If you need SSL, ensure it's configured correctly
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const saveUserWallet = async (userId, walletAddress) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      `INSERT INTO user_wallets (user_id, wallet_address) VALUES (?, ?)
       ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), wallet_address = VALUES(wallet_address)`,
      [userId, walletAddress]
    );
    connection.release();
    return rows;
  } catch (error) {
    console.error('Error saving user wallet:', error);
    throw error;
  }
};