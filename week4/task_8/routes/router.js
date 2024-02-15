const express = require('express');
const {
  getAllTasks, updateTask, createTaskAPI, updateTaskAPI, deleteTaskAPI,
} = require('../controllers/tasks');

const Router = express.Router();

//  EJS pages routes
Router.get('/', (req, res) => res.redirect('/tasks'));
Router.get('/tasks', getAllTasks);
Router.get('/add-task', (req, res) => res.render('add-task'));
Router.get('/update-task/:id', updateTask);

// APIs
Router.post('/api/v1/tasks/create', createTaskAPI);
Router.post('/api/v1/tasks/update/:id', updateTaskAPI);
Router.post('/api/v1/tasks/delete/:id', deleteTaskAPI);

module.exports = { Router };
