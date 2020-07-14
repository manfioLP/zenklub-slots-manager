import mongoose from 'mongoose';
const { professional } = require('../errors');

const ProfessionalSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    trim: true,
    required: [true, professional.NAME_REQUIRED]
  },
  deleted: {
    type: mongoose.Schema.Types.Boolean,
    default: false
  },
  specialties: {
    type: [mongoose.Schema.Types.String],
    default: []
  }
}, { timestamps: true});

export default mongoose.models.Professional || mongoose.model('Professional', ProfessionalSchema);
