import { ResourceOptions } from "adminjs";

export const customerResourceOptions: ResourceOptions = {
  navigation: "Customers",

  editProperties: [
    "firstName",
    "lastName",
    "email",
    "phone",
    "address",
    "userId",
  ],

  filterProperties: [
    "firstName",
    "lastName",
    "email",
    "phone",
    "address",
    "userId",
    "createdAt",
    "updatedAt",
  ],

  listProperties: ["id", "firstName", "lastName", "userId", "phone", "address"],

  showProperties: [
    "id",
    "firstName",
    "lastName",
    "email",
    "phone",
    "address",
    "userId",
    "createdAt",
    "updatedAt",
  ],
};
