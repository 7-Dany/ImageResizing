import express from 'express';
import { images } from './index';

const download = express.Router();

download.get(
  '/download/:index',
  (req: express.Request, res: express.Response) => {
    // it will find the image by index from images array and allow the user to download the resized image
    const image = images.find((image) => image.index === req.params.index);
    if (image) {
      res.download(`static/${image.file}`);
    }
  }
);

export default download;
