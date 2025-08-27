import { Router } from 'express'
import Template from '../models/Template.js'

const router = Router()

// Create
router.post('/', async (req, res) => {
  try {
    const { name, type, source = '', html = '', mjmlVersion = null, htmlVersion = null, reactEmailVersion = null } = req.body
    if (!name || !type) return res.status(400).json({ error: 'name and type are required' })
    const doc = await Template.create({ name, type, source, html, mjmlVersion, htmlVersion, reactEmailVersion })
    res.status(201).json(doc)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// List
router.get('/', async (_req, res) => {
  try {
    const docs = await Template.find({}).sort({ updatedAt: -1 }).lean()
    res.json(docs)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// Read
router.get('/:id', async (req, res) => {
  try {
    const doc = await Template.findById(req.params.id).lean()
    if (!doc) return res.status(404).json({ error: 'Not found' })
    res.json(doc)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// Update
router.put('/:id', async (req, res) => {
  try {
    const { name, type, source, html, mjmlVersion, htmlVersion, reactEmailVersion } = req.body
    const doc = await Template.findByIdAndUpdate(
      req.params.id,
      { name, type, source, html, mjmlVersion, htmlVersion, reactEmailVersion },
      { new: true, runValidators: true }
    )
    if (!doc) return res.status(404).json({ error: 'Not found' })
    res.json(doc)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const out = await Template.findByIdAndDelete(req.params.id)
    if (!out) return res.status(404).json({ error: 'Not found' })
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router
