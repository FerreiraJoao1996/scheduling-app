import { env } from "../shared/env/env";
import { createClient } from "redis";

export const redisClient = createClient({
  socket: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  },
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

await redisClient.connect();
console.log("✅ Redis conectado com sucesso!");