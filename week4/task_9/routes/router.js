/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const { body } = require('express-validator');

const Router = express.Router();
const {
  getAllUsers, getUserById, createUser, updateUser, deleteUser,
} = require('../controllers/users');

Router.get('/users', getAllUsers);
Router.get('/users/:id', getUserById);
Router.post('/users', [body('name').isAlpha().withMessage('Name must only contain alphabetical characters'), body('age').isInt().withMessage('Age must be a number')], createUser);
Router.put('/users', [body('attributes.name').isAlpha().withMessage('Name must only contain alphabetical characters'), body('attributes.age').isInt().withMessage('Age must be a number')], updateUser);
Router.delete('/users/:id', deleteUser);

module.exports = { Router };
