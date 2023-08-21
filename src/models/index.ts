import { Customer } from "./Customer";
import { Service } from "./Service";
import { User } from "./User";

User.hasMany(Customer, { as: "customers" });
Customer.belongsTo(User);

Customer.hasMany(Service, { as: "services" });
Service.belongsTo(Customer);

export { Customer, User, Service };
