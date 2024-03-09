/* eslint-disable import/extensions */
/* eslint-disable sort-imports */
/* eslint-disable no-console */
import express from 'express';
import { CustomError, httpStatusCodes } from './constants/constants.js';
import { errRes } from './helpers/sendReponse.js';
// import { connectDB } from './database/connect.js';
import { router } from './routes/index.route.js';
import { syncTables } from './database/relations.js';

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await syncTables();

app.use('/api/v1', router);

app.use('*', (req, res, next) => {
  next(new CustomError(httpStatusCodes['Not Found'], 'Page Not Found'));
});

app.use(errRes);

app.listen(PORT, async () => {
  try {
    // await connectDB();
    console.log(`Server started on http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
