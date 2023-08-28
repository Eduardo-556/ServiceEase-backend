import { DataTypes, Model, Optional } from "sequelize";
import { database } from "../database";

export interface ServiceImg {
  id: number;
  serviceId: number;
  imgUrl: string;
}

export interface ServiceImgCreationAttributes
  extends Optional<ServiceImg, "id"> {}

export interface ServiceImgInstance
  extends Model<ServiceImg, ServiceImgCreationAttributes>,
    ServiceImg {}

export const ServiceImg = database.define<ServiceImgInstance, ServiceImg>(
  "ServiceImgs",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    serviceId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "services",
        key: "id",
      },
    },
    imgUrl: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }
);
