import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1223Cale',
  database: 'blox_db'
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