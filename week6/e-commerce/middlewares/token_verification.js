import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { errRes } from '../helpers/sendReponse.js';
import { httpStatusCodes } from '../constants/constants.js';
dotenv.config();

export const userTokenVerification = async (req, res, next) => {
  let token = req.get('authorization')
  if (token) {
    token = token.slice(7);
    try {
      const data = await jwt.verify(token, process.env.JWT_SECRET);

      if(req.params.id !== data._id) {
        return errRes({
          message: 'Unauthorized',
          status: httpStatusCodes.Unauthorized
        }, req, res, next);
      }
      
      req.body.decoded = data;
      next();
    } catch (error) {
      return errRes({
        message: 'Unauthorized',
        status: httpStatusCodes.Unauthorized
      }, req, res, next);
    }
  }
  else {
    return errRes({
      message: 'Unauthorized',
      status: httpStatusCodes.Unauthorized
    }, req, res, next);
  }
}