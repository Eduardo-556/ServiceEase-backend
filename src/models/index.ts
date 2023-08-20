import { Customer } from "./Customer";
import { User } from "./User";

User.hasMany(Customer);
Customer.belongsTo(User);

export { Customer, User };
