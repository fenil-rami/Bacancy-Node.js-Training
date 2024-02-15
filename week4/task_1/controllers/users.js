const jwt = require('jsonwebtoken');
const fs = require('fs/promises');
const { internalServerError } = require('../handler/errors');

const JWT_SECRET = '9ff6125c982248baa6bd21162929b7c0';

const usersPath = `${__dirname}/../../users.json`;

exports.signup = async (req, res) => {
  try {
    const { body } = req;

    if (!body || (typeof body !== 'object') || !body.name || !body.email || !body.password) {
      return res.status(400).json({
        error: 'please provide all fields',
      });
    }

    let users = await fs.readFile(usersPath, 'utf-8');
    users = JSON.parse(users);

    const alreadyExists = users.filter((user) => user.email === body.email);

    if (alreadyExists && alreadyExists.length > 0) {
      return res.status(409).json({
        error: 'an account with this email already exists!',
      });
    }

    users.push(body);

    await fs.writeFile(usersPath, JSON.stringify(users));
    return res.status(200).json({
      message: 'user successfully registered!',
      user: body,
    });
  } catch (error) {
    return internalServerError(res, error);
  }
};

exports.login = async (req, res) => {
  try {
    const { body } = req;

    if (!body || (typeof body !== 'object') || !body.email || !body.password) {
      return res.status(400).json({
        error: 'please provide all fields',
      });
    }

    let users = await fs.readFile(usersPath, 'utf-8');

    users = JSON.parse(users);

    const alreadyExists = users.filter((user) => user.email === body.email);

    if (!alreadyExists || alreadyExists === undefined || alreadyExists.length === 0) {
      return res.status(401).json({
        error: 'account does not exists!',
      });
    }

    if (alreadyExists[0].password !== body.password) {
      return res.status(401).json({
        errror: 'invalid password!',
      });
    }

    const token = jwt.sign(body, JWT_SECRET, {
      expiresIn: '28d',
    });

    return res.status(200).json({
      message: 'authentication sucessfull!',
      token,
    });
  } catch (error) {
    return internalServerError(res, error);
  }
};
