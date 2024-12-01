const bcrypt = require('bcryptjs');
const crypto = require('crypto');

class PasswordUtils {
  static async hash(password) {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
  }

  static async compare(candidatePassword, hashedPassword) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }

  static generateResetToken() {
    // Generate random reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash token and set expire time
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Token expires in 10 minutes
    const tokenExpires = Date.now() + 10 * 60 * 1000;

    return {
      resetToken,        // Send to user
      hashedToken,       // Save in DB
      tokenExpires      // Save in DB
    };
  }

  static validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const errors = [];

    if (password.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters`);
    }
    if (!hasUpperCase) errors.push('Password must contain uppercase letter');
    if (!hasLowerCase) errors.push('Password must contain lowercase letter');
    if (!hasNumbers) errors.push('Password must contain number');
    if (!hasSpecialChar) errors.push('Password must contain special character');

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static generateRandomPassword(length = 12) {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;
    let password = '';

    // Ensure one character from each category
    password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    password += numberChars[Math.floor(Math.random() * numberChars.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }
}

module.exports = PasswordUtils;