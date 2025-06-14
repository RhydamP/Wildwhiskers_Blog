import Fastify from "fastify";
import blogRoutes from "./routes/blog.js";
import authRoutes from "./routes/auth.js";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import fastifyStatic from "@fastify/static";
import path from "path";
import fastifyMultipart from "@fastify/multipart";

const PORT = Number(process.env.PORT)!;
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["*"];

dotenv.config();

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyMultipart, {
  limits: {
    fileSize: 10 * 1024 * 1024, // Max file size 10MB
  },
});

// fastify.register(fastifyStatic, {
//   root: path.join(process.cwd(), "public"),
//   prefix: "/",
// });


fastify.register(cors, {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
});

fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || "your-secret-key",
});

const prisma = new PrismaClient();
fastify.decorate("db", prisma);

fastify.decorate("authenticate", async function (request : any, reply : any) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.code(401).send({ error: "Unauthorized" });
  }
});

// Register routes
fastify.register(authRoutes, { prefix: "/auth" });
fastify.register(blogRoutes, { prefix: "/api" });



console.log("Server is starting...");

fastify.listen({ port: PORT, host: "0.0.0.0" }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server running on port ${PORT}`);
});