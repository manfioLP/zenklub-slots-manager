import mongoose from 'mongoose';
const { slot } = require('../errors');
const { slotValidator } = require('../validators');

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
  bookerName: {
    type: mongoose.Schema.Types.String,
    trim: true
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
  year: {
    type: mongoose.Schema.Types.String,
    trim: true,
    required: [true, slot.YEAR_REQUIRED],
    validate: slotValidator.year
  },
  day: {
    type: mongoose.Schema.Types.String,
    trim: true,
    required: [true, slot.DAY_REQUIRED],
    validate: slotValidator.day
  },
  month: {
    type: mongoose.Schema.Types.String,
    trim: true,
    required: [true, slot.MONTH_REQUIRED],
    validate: slotValidator.month
  },
  identifier: {
    type: mongoose.Schema.Types.String,
    trim: true,
    unique: true
  },
  timeSorter: {
    type: mongoose.Schema.Types.Number
  }
}, { timestamps: true });

SlotSchema.pre('save', function (next) {
  this.identifier =
    `${this.get('year')}-${this.get('month')}-${this.get('day')}-${this.get('hour')}-${this.get('minutes')}#${this.get('professionalId')}`;

  this.timeSorter = Number(`${this.get('hour')}${this.get('minutes')}`);
  next();
});

export default mongoose.models.Slot || mongoose.model('Slot', SlotSchema);
