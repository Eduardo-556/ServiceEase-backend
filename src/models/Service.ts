import { DataTypes, Model, Optional } from "sequelize";
import { database } from "../database";

export interface Service {
  id: number;
  customerId: number;
  deviceModel: string;
  deviceSerial: string;
  deviceImei: string;
  serviceDescription: string;
  deadline: Date;
  serviceStatus: "pending" | "started" | "paused" | "ended";
  startTime: Date;
  pauseTime: Date;
  endTime: Date;
  totalTime: number;
  totalCost: number;
}

export interface ServiceCreationAttributes
  extends Optional<
    Service,
    | "id"
    | "startTime"
    | "pauseTime"
    | "endTime"
    | "totalTime"
    | "totalCost"
    | "deviceSerial"
    | "deviceImei"
  > {}

export interface ServiceInstance
  extends Model<Service, ServiceCreationAttributes>,
    Service {}

export const Service = database.define<ServiceInstance, Service>("Service", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  deviceModel: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  deviceSerial: {
    type: DataTypes.STRING,
  },
  deviceImei: {
    type: DataTypes.STRING,
  },
  serviceDescription: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  deadline: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  serviceStatus: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  startTime: {
    type: DataTypes.DATE,
  },
  pauseTime: {
    type: DataTypes.DATE,
  },
  endTime: {
    type: DataTypes.DATE,
  },
  totalTime: {
    type: DataTypes.INTEGER,
  },
  totalCost: {
    type: DataTypes.INTEGER,
  },
  customerId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: "customers",
      key: "id",
    },
  },
});
