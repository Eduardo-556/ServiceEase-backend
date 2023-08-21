import { ResourceWithOptions } from "adminjs";
import { customerResourceOptions } from "./customer";
import { Customer, Service, User } from "../../models";
import { userResourceOptions } from "./user";
import { serviceResourceOptions } from "./service";
export const adminJsResources: ResourceWithOptions[] = [
  {
    resource: Customer,
    options: customerResourceOptions,
  },
  {
    resource: User,
    options: userResourceOptions,
  },
  {
    resource: Service,
    options: serviceResourceOptions,
  },
];
