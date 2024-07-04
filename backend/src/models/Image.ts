import { BelongsToGetAssociationMixin, DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';
import { Article } from './Article';

export class Image extends Model {
  declare id: number;
  declare url: string;
  declare filename: string;
  declare description: string;
  declare articleId: number;

  public getRelatedArticle!: BelongsToGetAssociationMixin<Article>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Image.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  articleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Image',
});