const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 할일 생성
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    
    const todo = new Todo({ title });
    await todo.save();
    
    res.status(201).json({
      success: true,
      message: '할일이 생성되었습니다',
      data: todo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// 할일 목록 조회
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 할일 수정
router.put('/:id', async (req, res) => {
  try {
    const { title } = req.body;
    
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true, runValidators: true }
    );
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: '할일을 찾을 수 없습니다'
      });
    }
    
    res.status(200).json({
      success: true,
      message: '할일이 수정되었습니다',
      data: todo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// 할일 삭제
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: '할일을 찾을 수 없습니다'
      });
    }
    
    res.status(200).json({
      success: true,
      message: '할일이 삭제되었습니다'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;

