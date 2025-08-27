import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { connectDB } from './src/db.js'
import templatesRouter from './src/routes/templates.js'

const app = express()
const PORT = process.env.PORT || 4000

// Build allowed origins list: always include local dev ports, plus any from env (comma-separated)
const DEFAULT_ORIGINS = ['http://localhost:3000', 'http://127.0.0.1:3000']
const envOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)
const ALLOWED_ORIGINS = Array.from(new Set([...DEFAULT_ORIGINS, ...envOrigins]))

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (no origin), e.g., Postman/cURL
      if (!origin) return callback(null, true)
      if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true)
      return callback(new Error(`Not allowed by CORS: ${origin}`), false)
    },
    credentials: true,
  })
)
app.use(express.json({ limit: '2mb' }))
app.use(morgan('dev'))

app.get('/health', (_req, res) => res.json({ ok: true }))

app.use('/api/templates', templatesRouter)

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`))
  })
  .catch((err) => {
    console.error('Failed to start server:', err)
    process.exit(1)
  })
