import type { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "./db";

interface AuthRequest {
  username: string;
  email: string;
  password: string;
}

export default async function authRoutes(fastify: FastifyInstance) {
  // Admin Signup
  fastify.post("/signup", async (request, reply) => {
    try {
      const { username, email, password } = request.body as AuthRequest;

      if (!username || !email || !password) {
        return reply.status(400).send({ message: "Username or email and password are required." });
      }

      // Check if admin already exists
      const existingAdmin = await prisma.admin.findUnique({ where: { username } });
      if (existingAdmin) {
        return reply.status(409).send({ message: "Admin already exists." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the admin
      const newAdmin = await prisma.admin.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      return reply.status(201).send({ message: "Admin created successfully", adminId: newAdmin.id });
    } catch (error) {
      console.error("Signup Error:", error);
      return reply.status(500).send({ message: "Internal Server Error." });
    }
  });

  // Admin Login
  fastify.post("/login", async (request, reply) => {
    try {
      const { email , password } = request.body as AuthRequest;

      if (!email || !password) {
        return reply.status(400).send({ message: "Email and password are required." });
      }

      // Find the admin by username
      const admin = await prisma.admin.findUnique({ where: { email } });
      if (!admin) {
        return reply.status(401).send({ message: "Invalid credentials." });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return reply.status(401).send({ message: "Invalid credentials." });
      }

      // Create JWT token
      const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET || "your-secret-key", { expiresIn: "12h" });

      return reply.send({ token });
    } catch (error) {
      console.error("Login Error:", error);
      return reply.status(500).send({ message: "Internal Server Error." });
    }
  });
}
