import { Router } from 'express';
import { uploadImage, createImage, getImages } from '../controllers/imageController';

const router = Router();

router.post('/upload', uploadImage, createImage);
router.get('/', getImages);

export default router;
