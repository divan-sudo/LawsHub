import { BelongsToGetAssociationMixin, DataTypes, HasManyGetAssociationsMixin, Model, Optional } from 'sequelize';
import { sequelize } from '../db';
import { ContentType } from '../enums/ContentType';
import { Law } from './Law';
import { Image } from './Image';

export class Article extends Model{
  declare id: number;
  declare lawId: number;
  declare content: string;
  declare contentType: ContentType;

  public getRelatedLaw!: BelongsToGetAssociationMixin<Law>;
  public getAssociatedImages!: HasManyGetAssociationsMixin<Image>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Article.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  contentType: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lawId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Article',
});