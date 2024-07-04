import { Router } from 'express';
import {
  createLaw,
  getLaws,
  getLawById,
  updateLaw,
  deleteLaw
} from '../controllers/lawController';

const router = Router();

router.post('/', createLaw);
router.get('/regulation/:regulationId', getLaws);
router.get('/:id', getLawById);
router.put('/:id', updateLaw);
router.delete('/:id', deleteLaw);

export default router;
