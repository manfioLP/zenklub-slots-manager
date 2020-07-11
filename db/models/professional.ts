import mongoose from 'mongoose';
const { professional } = require('../errors');

const ProfessionalSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    trim: true,
    required: [true, professional.NAME_REQUIRED]
  }
}, { timestamps: true});

export default mongoose.model('Professional', ProfessionalSchema);
