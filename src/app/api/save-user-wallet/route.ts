import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1223Cale',
  database: 'blox_db'
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { userId, walletAddress } = data;

    if (!userId || !walletAddress) {
      return NextResponse.json({ message: 'UserId and WalletAddress are required' }, { status: 400 });
    }

    const [rows] = await pool.execute(
      `INSERT INTO user_wallets (user_id, wallet_address) VALUES (?, ?)
       ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), wallet_address = VALUES(wallet_address)`,
      [userId, walletAddress]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error saving user wallet:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}