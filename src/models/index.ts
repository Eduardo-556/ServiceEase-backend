import { Customer } from "./Customer";
import { Service } from "./Service";
import { ServiceImg } from "./ServiceImg";
import { User } from "./User";

User.hasMany(Customer, { as: "customers" });
Customer.belongsTo(User);

Customer.hasMany(Service, { as: "services" });
Service.belongsTo(Customer);

Service.hasMany(ServiceImg);
ServiceImg.belongsTo(Service);
export { Customer, User, Service };
