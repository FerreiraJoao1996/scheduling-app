import { redisClient } from "clients/redisClient";
import { env } from "shared/env/env";

interface CacheOptions {
  ttl?: number;
}

export class CacheService {
  static async getOrSet<T>(
    key: string,
    fetchFn: () => Promise<T>,
    options?: CacheOptions
  ): Promise<T> {
    const cached = await redisClient.get(key);

    if (cached) {
      return JSON.parse(cached) as T;
    }

    const result = await fetchFn();

    const ttl = env.REDIS_EXPIRE_TIME ?? 3600;

    await redisClient.setEx(key, ttl, JSON.stringify(result));

    return result;
  }

  static async del(key: string): Promise<void> {
    await redisClient.del(key);
  }

  static async clearPrefix(prefix: string): Promise<void> {
    const keys = await redisClient.keys(`${prefix}*`);
    if (keys.length > 0) await redisClient.del(keys);
  }
}
