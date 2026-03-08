import "server-only";

import { kv } from "@vercel/kv";
import { createClient } from "redis";

type JsonValue = Record<string, unknown> | unknown[] | string | number | boolean | null;

const HAS_KV_CONFIG = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
const HAS_REDIS_URL = Boolean(process.env.REDIS_URL);

type MinimalRedisClient = ReturnType<typeof createClient>;

let redisClient: MinimalRedisClient | null = null;
let redisConnectPromise: Promise<MinimalRedisClient> | null = null;

function getRedisClient(): Promise<MinimalRedisClient> {
  if (!process.env.REDIS_URL) {
    return Promise.reject(new Error("REDIS_URL is not configured."));
  }

  if (redisClient?.isOpen) {
    return Promise.resolve(redisClient);
  }

  if (redisConnectPromise) {
    return redisConnectPromise;
  }

  const client = createClient({ url: process.env.REDIS_URL });
  redisConnectPromise = client.connect().then(() => {
    redisClient = client;
    redisConnectPromise = null;
    return client;
  });
  return redisConnectPromise as Promise<MinimalRedisClient>;
}

export function hasDurableStoreConfig(): boolean {
  return HAS_KV_CONFIG || HAS_REDIS_URL;
}

export function durableStoreEnvHint(): string {
  return "Configure KV_REST_API_URL + KV_REST_API_TOKEN or REDIS_URL.";
}

export async function storeGet<T>(key: string): Promise<T | null> {
  if (HAS_KV_CONFIG) {
    return (await kv.get<T>(key)) ?? null;
  }

  if (HAS_REDIS_URL) {
    const client = await getRedisClient();
    const raw = await client.get(key);
    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as T;
  }

  return null;
}

export async function storeSet(key: string, value: JsonValue, options?: { exSeconds?: number }): Promise<void> {
  if (HAS_KV_CONFIG) {
    if (options?.exSeconds) {
      await kv.set(key, value, { ex: options.exSeconds });
      return;
    }

    await kv.set(key, value);
    return;
  }

  if (HAS_REDIS_URL) {
    const client = await getRedisClient();
    const payload = JSON.stringify(value);

    if (options?.exSeconds) {
      await client.set(key, payload, { EX: options.exSeconds });
      return;
    }

    await client.set(key, payload);
  }
}

export async function storeDel(key: string): Promise<void> {
  if (HAS_KV_CONFIG) {
    await kv.del(key);
    return;
  }

  if (HAS_REDIS_URL) {
    const client = await getRedisClient();
    await client.del(key);
  }
}
