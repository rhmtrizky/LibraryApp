import * as express from 'express';
import { Request, Response } from 'express-serve-static-core';
import { AppDataSource } from './data-source';
import router from './route';
import 'dotenv/config';

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 5000;

    var cors = require('cors');

    app.use(cors());

    app.use(express.json());
    app.use('/library', router);

    app.get('/', (reg: Request, res: Response) => {
      res.send('Welcome in Our Library');
    });

    app.listen(port, () => {
      console.log(`server running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
