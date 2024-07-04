import { Regulation } from './Regulation';
import { Law } from './Law';
import { Article } from './Article';
import { Image } from './Image';

Regulation.hasMany(Law, { as: 'relatedLaws', foreignKey: 'regulationId' });
Law.belongsTo(Regulation, { foreignKey: 'regulationId', as: 'relatedRegulation' });

Law.hasMany(Article, { as: 'relatedArticles', foreignKey: 'lawId' });
Article.belongsTo(Law, { foreignKey: 'lawId', as: 'relatedLaw' });

Article.hasMany(Image, { as: 'associatedImages', foreignKey: 'articleId' });
Image.belongsTo(Article, { foreignKey: 'articleId', as: 'relatedArticle' });

export { Regulation, Law, Article, Image };
