import nodemailer from 'nodemailer';

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',  // You can use other services like SendGrid, etc.
  auth: {
    user: process.env.EMAIL,  // Your email address (ensure it's in your .env file)
    pass: process.env.EMAIL_PASSWORD,  // Your email password (or app-specific password)
  },
});

export const sendOTP = async (email, otp) => {
  try {
    // Email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP for Email Verification',
      html: `<p>Your OTP for email verification is: <strong>${otp}</strong></p>`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('OTP sent to', email);
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Error sending OTP');
  }
};
