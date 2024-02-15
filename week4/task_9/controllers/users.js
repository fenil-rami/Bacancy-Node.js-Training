/* eslint-disable import/no-extraneous-dependencies */
const { validationResult } = require('express-validator');
const fs = require('fs/promises');
const { internalServerError } = require('../handler/errors');

const usersPath = `${__dirname}/../users.json`;

exports.getAllUsers = async (req, res) => {
  try {
    const users = await fs.readFile(usersPath, 'utf-8');
    return res.status(200).json({
      code: 200,
      message: 'all users fetched successfully.',
      data: JSON.parse(users),
    });
  } catch (error) {
    return internalServerError(res, error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    let users = await fs.readFile(usersPath, 'utf-8');
    users = JSON.parse(users);

    users = users.filter((user) => user.id === req.params.id);

    if (!users || users === undefined || users.length === 0) {
      return res.status(404).json({
        error: 'user with given id does not exists',
      });
    }

    return res.status(200).json({
      code: 200,
      message: 'user with given id fetched successfully.',
      data: users,
    });
  } catch (error) {
    return internalServerError(res, error);
  }
};

exports.createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let users = await fs.readFile(usersPath, 'utf-8');
    users = JSON.parse(users);

    const newUser = {
      id: crypto.randomUUID(),
      attributes: {
        name: req.body.name,
        age: req.body.age,
      },
      createdAt: new Date(),
    };

    users.push(newUser);

    await fs.writeFile(usersPath, JSON.stringify(users));

    return res.status(201).json({
      code: 201,
      message: 'user has been created successfully.',
      data: newUser,
    });
  } catch (error) {
    return internalServerError(res, error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let users = await fs.readFile(usersPath, 'utf-8');
    users = JSON.parse(users);

    users = users.map((user) => {
      if (user.id === req.body.id) {
        user = req.body;
      }
      return user;
    });

    await fs.writeFile(usersPath, JSON.stringify(users));

    return res.status(200).json({
      code: 200,
      message: 'user details has been updated successfully',
    });
  } catch (error) {
    return internalServerError(res, error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let users = await fs.readFile(usersPath, 'utf-8');
    users = JSON.parse(users);

    users = users.filter((user) => user.id !== req.params.id);

    await fs.writeFile(usersPath, JSON.stringify(users));

    return res.status(200).json({
      code: 200,
      message: 'user has been deleted successfully.',
    });
  } catch (error) {
    return internalServerError(res, error);
  }
};
