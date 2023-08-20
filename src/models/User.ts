import { DataTypes, Model, Optional } from "sequelize";
import { database } from "../database";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  birth: Date;
  email: string;
  password: string;
  language: "pt-BR" | "en-US";
  role: "admin" | "user";
  subscriptionStatus: "active" | "inactive";
  subscriptionPlan: "basic" | "premium";
}

export interface UserCreationAttributes extends Optional<User, "id"> {}

export interface UserInstance
  extends Model<User, UserCreationAttributes>,
    User {}

export const User = database.define<UserInstance, User>("User", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  firstName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  birth: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  language: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  subscriptionStatus: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  subscriptionPlan: {
    allowNull: false,
    type: DataTypes.STRING,
  },
});
