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

      // check if it's a product api, then here only check if the user is seller or not
      let seller_verification = (req.originalUrl.includes('products') ? (data.role === 'seller') : false);

      // for users api, verify the user in request with decoded user data 
      if (seller_verification || req.params.id === data._id) {
        req.body.decoded = data;
        next();
        return;
      }

      return errRes({
        message: 'Forbidden',
        status: httpStatusCodes.Forbidden
      }, req, res, next);
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