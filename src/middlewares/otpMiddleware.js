import crypto from 'crypto';
import { sendOTP } from '../utils/mailer.js';

// Store OTPs temporarily (e.g., using an in-memory store or a simple global object for now)
const otpStore = {}; // This will hold OTPs and their timestamps (you can later replace this with a DB or Redis)

const OTP_EXPIRY_TIME = 5 * 60 * 1000; // OTP expires after 5 minutes (in milliseconds)

// Middleware to generate OTP and send it to the user's email
export const sendOTPMiddleware = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Check if an OTP is already generated for this email and is still valid
    if (otpStore[email] && Date.now() - otpStore[email].timestamp < OTP_EXPIRY_TIME) {
      return res.status(400).json({ message: 'OTP already sent. Please verify within 5 minutes.' });
    }

    // Generate a random 6-digit OTP
    const otp = crypto.randomInt(100000, 999999);

    // Store the OTP with the timestamp (expiry logic)
    otpStore[email] = {
      otp,
      timestamp: Date.now(),
    };

    // Send OTP to the user's email
    await sendOTP(email, otp);

    // Proceed to the next step in the controller (email verification step)
    res.status(200).json({ message: 'OTP sent successfully! Please check your email.' });
  } catch (error) {
    console.error('Error generating OTP:', error);
    res.status(500).json({ message: 'Error generating OTP', error: error.message });
  }
};

// Middleware to verify OTP during signup
export const verifyOTPMiddleware = async (req, res, next) => {
  const { email, otp } = req.body;

  try {
    // Check if OTP exists and is not expired
    const storedOTP = otpStore[email];
    if (!storedOTP) {
      return res.status(400).json({ message: 'OTP not generated or expired. Please request a new one.' });
    }

    // Check if OTP has expired
    if (Date.now() - storedOTP.timestamp > OTP_EXPIRY_TIME) {
      delete otpStore[email]; // Remove expired OTP
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    // Check if the OTP is correct
    if (storedOTP.otp !== parseInt(otp, 10)) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP is valid, so proceed with the signup
    delete otpStore[email]; // Remove OTP after successful verification
    next(); // Continue to signup logic

  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Error verifying OTP', error: error.message });
  }
};
