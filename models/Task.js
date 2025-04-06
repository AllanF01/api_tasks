const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ['pendiente', 'completada'],
    default: 'pendiente'
  }
});

module.exports = mongoose.model('Task', taskSchema);

