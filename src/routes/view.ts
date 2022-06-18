import express from 'express';
import { images } from './index';
import fs from 'fs';

const view = express.Router();

view.get('/view/:index', (req: express.Request, res: express.Response) => {
  // it will find the image from images array and view the image on the browser
  const image = images.find((image) => image.index === req.params.index);
  if (image) {
    fs.readFile(`static/${image.file}`, (err, data) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': `image/${image.format}` });
      res.end(data, 'base64');
    });
  }
});

export default view;
