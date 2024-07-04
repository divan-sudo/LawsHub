import { Request, Response } from 'express';
import { Article } from '../models/Article';

export const createArticle = async (req: Request, res: Response) => {
  const { content, contentType, lawId } = req.body;

  try {
    const article = await Article.create({ content, contentType, lawId });
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: 'Error creating article' });
  }
};

export const getArticles = async (req: Request, res: Response) => {
  const { lawId } = req.params;
  try {
    const articles = await Article.findAll({
      where: { lawId },
      order: [['createdAt', 'ASC']]
    });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching articles' });
  }
};

export const getArticleById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const article = await Article.findByPk(id);
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching article' });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content, contentType, lawId } = req.body;

  try {
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    article.content = content;
    article.contentType = contentType;
    article.lawId = lawId;
    await article.save();

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: 'Error updating article' });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    await article.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting article' });
  }
};
