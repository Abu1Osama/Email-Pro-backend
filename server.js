import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { connectDB } from './src/db.js'
import templatesRouter from './src/routes/templates.js'

const app = express()
const PORT = process.env.PORT || 4000

// Allow all origins. Using origin: true reflects the request origin and works with credentials
app.use(
  cors({
    origin: true,
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
