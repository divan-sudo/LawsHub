import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { Image } from '../models/Image';

// Configure multer for file storage on local system
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

export const uploadImage = upload.single('image');

export const createImage = async (req: Request, res: Response) => {
  const { description, articleId } = req.body;
  const { file } = req;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const image = await Image.create({
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      description: description || '',
      articleId,
    });

    res.status(201).json(image);
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Error uploading image' });
  }
};

export const getImages = async (req: Request, res: Response) => {
  try {
    const images = await Image.findAll();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching images' });
  }
};
