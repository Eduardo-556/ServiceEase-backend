import { ResourceWithOptions } from "adminjs";
import { customerResourceOptions } from "./customer";
import { Customer, User } from "../../models";
import { userResourceOptions } from "./user";

export const adminJsResources: ResourceWithOptions[] = [
  {
    resource: Customer,
    options: customerResourceOptions,
  },
  {
    resource: User,
    options: userResourceOptions,
  },
];
