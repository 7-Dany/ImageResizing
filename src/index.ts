import express from 'express';
import sharp from 'sharp';
import methodOverride from 'method-override';
import { v4 } from 'uuid';
import { images, upload } from './routes';
import deleteImage from './routes/delete';
import edit from './routes/edit';
import view from './routes/view';
import download from './routes/download';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/images', deleteImage);
app.use('/images', edit);
app.use('/images', view);
app.use('/images', download);

// Main root redirected to /images url
app.get('/', (req: express.Request, res: express.Response) => {
  res.redirect('/images');
});

app.get('/images', (req: express.Request, res: express.Response) => {
  // Copy from main data of images to reverse it , to show on front end from the end to the beginning
  const imagesCopy = images.slice();
  res.render('home', { imagesCopy });
});

app.post('/images', upload.single('image'), async (req, res) => {
  let fileExist = false;
  const filename: string = req.body.filename;
  const format: string = req.body.format;
  // Object to save the data for easy call
  const fileData = {
    file: `assets/thumb/${filename}.${format}`,
    originalFile: `assets/userimages/${filename}.${format}`,
    filename: filename,
    format: format,
    width: parseInt(req.body.width),
    height: parseInt(req.body.height),
    index: v4()
  };
  // Checking if the image with same name exist in our data or not
  images.forEach((image) => {
    if (image.originalFile === fileData.originalFile) {
      fileExist = true;
    }
  });
  // if image not exist it will create new one else it will ignore
  if (!fileExist) {
    sharp(`static/${fileData.originalFile}`)
      .resize(fileData.width, fileData.height, { fit: 'contain' })
      .toFile(`static/${fileData.file}`, (err) => {
        if (err) throw err;
      });
    images.push(fileData);
  }
  // redirecting after 500ms to be sure the image is done with sharp to be viewed with no issue
  setTimeout(() => {
    res.redirect(req.originalUrl);
  }, 500);
});

app.listen(port, () => {
  console.log(`Server Started at http://localhost:${port}`);
});
export default app;
