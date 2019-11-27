const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  departments: { type: [String], required: [true, 'Please add department'] }
});

module.exports = mongoose.model('Department', DepartmentSchema);
