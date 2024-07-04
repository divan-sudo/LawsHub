import { BelongsToGetAssociationMixin, DataTypes, HasManyGetAssociationsMixin, Model, Optional } from 'sequelize';
import { sequelize } from '../db';
import { Article } from './Article';
import { Regulation } from './Regulation';


export class Law extends Model {
  declare id: number;
  declare section: string | null;
  declare title: string;
  declare regulationId: number;

  public getRelatedRegulation!: BelongsToGetAssociationMixin<Regulation>;
  public getRelatedArticles!: HasManyGetAssociationsMixin<Article>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Law.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  section: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  regulationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Law',
});