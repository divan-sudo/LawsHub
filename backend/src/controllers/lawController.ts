import { Request, Response } from 'express';
import { Law } from '../models/Law';

export const createLaw = async (req: Request, res: Response) => {
  const { section, title, regulationId } = req.body;

  try {
    const law = await Law.create({ section, title, regulationId });
    res.status(201).json(law);
  } catch (error) {
    res.status(500).json({ error: 'Error creating law' });
  }
};

export const getLaws = async (req: Request, res: Response) => {
  const { regulationId } = req.params;
  try {
    const laws = await Law.findAll({
      where: { regulationId },
      order: [['createdAt', 'ASC']]
    });
    res.status(200).json(laws);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching laws' });
  }
};

export const getLawById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const law = await Law.findByPk(id);
    if (law) {
      res.status(200).json(law);
    } else {
      res.status(404).json({ error: 'Law not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching law' });
  }
};

export const updateLaw = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { section, title, regulationId } = req.body;

  try {
    const law = await Law.findByPk(id);
    if (!law) {
      return res.status(404).json({ error: 'Law not found' });
    }

    law.section = section;
    law.title = title;
    law.regulationId = regulationId;
    await law.save();

    res.status(200).json(law);
  } catch (error) {
    res.status(500).json({ error: 'Error updating law' });
  }
};

export const deleteLaw = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const law = await Law.findByPk(id);
    if (!law) {
      return res.status(404).json({ error: 'Law not found' });
    }

    await law.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting law' });
  }
};
