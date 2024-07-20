CREATE TABLE blox_referral_14d3da50 (
    user_index INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    dynamic_id VARCHAR(255) NOT NULL UNIQUE,
    referrer_index INT UNSIGNED DEFAULT NULL,
    direct_referrals INT UNSIGNED DEFAULT 0,
    total_referrals INT UNSIGNED DEFAULT 0,
    referral_code VARCHAR(255) UNIQUE DEFAULT NULL,
    otp_enabled BOOLEAN DEFAULT FALSE,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (referrer_index) REFERENCES blox_referral_14d3da50(user_index)
);

CREATE TABLE blox_points_7c6d27b4 (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_index INT UNSIGNED NOT NULL,
    points INT NOT NULL,
    reason TEXT NOT NULL,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_index) REFERENCES blox_referral_14d3da50(user_index)
);
