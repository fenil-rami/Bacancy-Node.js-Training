/* eslint-disable import/extensions */
import { httpStatusCodes } from '../constants/constants.js';

export const sendResponse = (res, statuscode, status, operation, data) => data ? res.status(statuscode).json({ status, operation, data }) : res.status(statuscode).json({ status, operation}); 

// eslint-disable-next-line no-unused-vars
export const errRes = (err, req, res, next) => res.status(err.status || httpStatusCodes['Internal Server Error']).json({ status: 'error', message: err.message || 'Server Error' });
