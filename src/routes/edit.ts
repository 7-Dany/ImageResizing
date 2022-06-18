import express from 'express';
import { images, upload } from './index';
import fs from 'fs';
import sharp from 'sharp';

const edit = express.Router();

edit.get('/edit/:index', (req: express.Request, res: express.Response) => {
  // it will find the image from images array and display it in edit html
  const image = images.find((image) => image.index === req.params.index);
  if (image) {
    res.render('edit', { image });
  }
});

edit.patch(
  '/edit/:index',
  upload.single('image'), // upload the image to userImages if the previous image got changed to another one
  (req: express.Request, res: express.Response) => {
    // it will find the image from images array and check if the user changed the image itself it will delete the previous image
    // if the user didn't change the previous image it will resize the original image again and delete the previous resized image
    const image = images.find((image) => image.index === req.params.index);
    if (image) {
      // checking if the user change the image or not
      if (req.body.filename !== '') {
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
        const filename = req.body.filename;
        const format = req.body.format;
        image.file = `assets/thumb/${filename}.${format}`;
        image.originalFile = `assets/userimages/${filename}.${format}`;
        image.filename = filename;
        image.format = format;
        image.width = parseInt(req.body.width);
        image.height = parseInt(req.body.height);
      } else {
        image.width = parseInt(req.body.width);
        image.height = parseInt(req.body.height);
        image.file = `assets/thumb/${image.filename}.${image.format}`;
        fs.unlink(
          `static/assets/thumb/${image.filename}.${image.format}`,
          (err) => {
            if (err) throw err;
          }
        );
      }
      // resize the image whether if its new one or the original image
      sharp(`static/${image.originalFile}`)
        .resize(image.width, image.height, { fit: 'contain' })
        .toFile(`static/${image.file}`, (err) => {
          if (err) throw err;
        });
      // redirecting after 500ms to be sure the image will is done and be viewed with no issue
      setTimeout(() => {
        res.redirect('/');
      }, 500);
    }
  }
);

export default edit;
