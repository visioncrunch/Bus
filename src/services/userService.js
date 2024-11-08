import prisma from '../config/database.js';
import bcrypt from 'bcryptjs';

// Signup service (creates a new user)
export const signupService = async (firstName, lastName, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });
  return user;
};

// Login service (checks if user credentials are valid)
export const loginService = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && await bcrypt.compare(password, user.password)) {
    return user; // Credentials are correct, return user
  }
  return null; // Invalid credentials
};
