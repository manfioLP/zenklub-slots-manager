import mongoose from 'mongoose';
const { slot } = require('../errors');

const SlotSchema = new mongoose.Schema({
  professionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professional',
    required: [true, slot.PROFESSIONAL_REQUIRED]
  },
  previousAvailable: {
    type: mongoose.Schema.Types.Boolean,
    default: true
  },
  nextAvailable: {
    type: mongoose.Schema.Types.Boolean,
    default: true
  },
  booked: {
    type: mongoose.Schema.Types.Boolean,
    default: false
  },
  hour: {
    type: mongoose.Schema.Types.String,
    trim: true,
    required: [true, slot.HOUR_REQUIRED]
  },
  minutes: {
    type: mongoose.Schema.Types.String,
    trim: true,
    required: [true, slot.MINUTES_REQUIRED]
  },
  weekday: {
    type: mongoose.Schema.Types.String,
    trim: true,
    required: [true, slot.WEEKDAY_REQUIRED]
  },
  month: {
    type: mongoose.Schema.Types.String,
    trim: true,
    required: [true, slot.MONTH_REQUIRED]
  }
}, { timestamps: true });

SlotSchema.pre('save', next => {
  this.identifier =
    `${this.get('professionalId')}-${this.get('hour')}${this.get('minutes')}`;
  next();
});

export default mongoose.model('Slot', SlotSchema);
