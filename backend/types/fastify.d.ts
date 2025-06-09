import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import type { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    db: PrismaClient;
  }

  interface FastifyRequest {
    jwt: {
      sign: (payload: object) => string;
      verify: () => JwtPayload;
    };
  }
}
