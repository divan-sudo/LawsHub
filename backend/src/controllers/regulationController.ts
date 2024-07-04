import { Request, Response } from 'express';
import { Regulation } from '../models/Regulation';
import { Article, Law, Image } from '../models';

export const createRegulation = async (req: Request, res: Response) => {
  const { countryIso2, name, description, lastUpdateNote } = req.body;

  try {
    const regulation = await Regulation.create({ countryIso2, name, description, lastUpdateNote });
    res.status(201).json(regulation);
  } catch (error) {
    res.status(500).json({ error: 'Error creating regulation' });
  }
};

export const getRegulations = async (req: Request, res: Response) => {
  try {
    const regulations = await Regulation.findAll({
      include: [
        {
          model: Law,
          as: 'relatedLaws',
          include: [
            {
              model: Article,
              as: 'relatedArticles',
              include: [
                {
                  model: Image,
                  as: 'associatedImages'
                }
              ]
            }
          ]
        }
      ],
      order: [['id', 'ASC']]
    });

    // Sort laws, articles, and images by createdAt
    const sortedRegulations = regulations.map(regulation => {
      const laws = regulation.get('relatedLaws') as Law[];
      laws.sort((a, b) => a.id - b.id);
      laws.forEach(law => {
        const articles = law.get('relatedArticles') as Article[];
        articles.sort((a, b) => a.id - b.id);
        articles.forEach(article => {
          const images = article.get('associatedImages') as Image[];
          images.sort((a, b) => a.id - b.id);
        });
      });
      return regulation;
    });

    res.status(200).json(sortedRegulations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching regulations' });
  }
};

export const getRegulationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const regulation = await Regulation.findByPk(id, {
      include: [
        {
          model: Law,
          as: 'relatedLaws',
          include: [
            {
              model: Article,
              as: 'relatedArticles',
              include: [
                {
                  model: Image,
                  as: 'associatedImages'
                }
              ]
            }
          ]
        }
      ],
      order: [['id', 'ASC']]
    });
    
    if (regulation) {
      res.status(200).json(regulation);
    } else {
      res.status(404).json({ error: 'Regulation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching regulation' });
  }
};

export const updateRegulation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { countryIso2, name, description, lastUpdateNote } = req.body;

  try {
    const regulation = await Regulation.findByPk(id);
    if (!regulation) {
      return res.status(404).json({ error: 'Regulation not found' });
    }

    regulation.countryIso2 = countryIso2;
    regulation.name = name;
    regulation.description = description;
    regulation.lastUpdateNote = lastUpdateNote;
    await regulation.save();

    res.status(200).json(regulation);
  } catch (error) {
    res.status(500).json({ error: 'Error updating regulation' });
  }
};

export const deleteRegulation = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const regulation = await Regulation.findByPk(id);
    if (!regulation) {
      return res.status(404).json({ error: 'Regulation not found' });
    }

    await regulation.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting regulation' });
  }
};
