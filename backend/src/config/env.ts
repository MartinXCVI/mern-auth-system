import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT_ENV: z.string(),
  SALT_ROUNDS: z.string().transform((val): number => parseInt(val, 10)),
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  DATABASE_URI: z.string().url(),
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string(),
  SENDER_EMAIL: z.string()
})

const safeParsed = envSchema.safeParse(process.env)

if(!safeParsed.success) {
  console.error('Invalid environment variables:', safeParsed.error.format())
  process.exit(1)
}

const env = safeParsed.data

export const {
  NODE_ENV,
  PORT_ENV,
  SALT_ROUNDS,
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  DATABASE_URI,
  SMTP_USER,
  SMTP_PASSWORD,
  SENDER_EMAIL
} = env