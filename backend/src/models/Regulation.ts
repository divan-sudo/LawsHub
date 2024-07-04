import { DataTypes, HasManyGetAssociationsMixin, Model, Optional } from 'sequelize';
import { sequelize } from '../db';
import { Law } from './Law';


export class Regulation extends Model {
  declare id: number;
  declare countryIso2: string;
  declare name: string;
  declare description: string;
  declare lastUpdateNote: string;

  public getRelatedLaws!: HasManyGetAssociationsMixin<Law>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Regulation.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  countryIso2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastUpdateNote: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Regulation',
});