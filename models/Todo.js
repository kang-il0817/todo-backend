const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '할일 내용을 입력해주세요'],
    trim: true,
    maxlength: [200, '할일은 200자 이내로 입력해주세요']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Todo', todoSchema);

