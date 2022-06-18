import multer from 'multer';

// images array to save all image on it
export const images: {
  file: string;
  originalFile: string;
  filename: string;
  format: string;
  width: number;
  height: number;
  index: string;
}[] = [];

// to allow uploading images to userimages to be able to edit the original image itself if needed
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'static/assets/userimages');
  },
  filename(
    req,
    file,
    callback: (error: Error | null, filename: string) => void
  ) {
    callback(null, file.originalname);
  }
});

export const upload = multer({ storage: storage });
