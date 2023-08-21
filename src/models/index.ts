import { Customer } from "./Customer";
import { Service } from "./Service";
import { User } from "./User";

User.hasMany(Customer);
Customer.belongsTo(User);

Customer.hasMany(Service);
Service.belongsTo(Customer);

export { Customer, User, Service };
