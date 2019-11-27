const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  days: { type: [String], required: [true, 'Please add weekdays'] },
  time: { type: [String], required: [true, 'Please add time'] }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
