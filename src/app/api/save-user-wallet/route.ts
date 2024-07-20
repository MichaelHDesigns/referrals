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
    console.error('Error saving user wallet:', error.message);  // Log error message
    console.error(error.stack); // Log stack trace
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}