import express from 'express';
import fs from 'fs';
import { images } from './index';

const deleteImage = express.Router();

deleteImage.get(
  '/delete/:index',
  (req: express.Request, res: express.Response) => {
    // To find the image in images array by index
    const image = images.find((image) => image.index === req.params.index);
    // if the image exist it will delete it from images array and delete both original image and resized image from the file
    if (image) {
      fs.unlink(
        `static/assets/userimages/${image.filename}.${image.format}`,
        (err) => {
          if (err) throw err;
        }
      );
      fs.unlink(
        `static/assets/thumb/${image.filename}.${image.format}`,
        (err) => {
          if (err) throw err;
        }
      );
      const index = images.indexOf(image);
      images.splice(index, 1);
    }
    res.redirect('/');
  }
);

export default deleteImage;
