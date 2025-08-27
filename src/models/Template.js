import mongoose from 'mongoose'

const TemplateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ['mjml', 'react-email'], required: true },
    // Raw authoring source: MJML markup or React source (stringified)
    source: { type: String, default: '' },
    // Rendered HTML snapshot
    html: { type: String, default: '' },
    // Versions metadata
    mjmlVersion: { type: String, default: null },
    htmlVersion: { type: String, default: null },
    reactEmailVersion: { type: String, default: null },
  },
  { timestamps: true }
)

export default mongoose.model('Template', TemplateSchema)
