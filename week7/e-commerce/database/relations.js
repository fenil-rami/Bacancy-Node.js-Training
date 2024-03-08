import { User } from "./models/user.model.js";
import { Product } from "./models/product.model.js";

const syncTables = async () => {

  // User.hasMany(Product, {
  //     onDelete: "CASCADE",
  //     foreignKey: 'user_id'
  // })
  // Product.belongsTo(User, {
  //     foreignKey: 'user_id'
  // })

  // User.hasMany(Cart, {
  //     onDelete: "CASCADE",
  //     foreignKey: 'user_id'
  // });
  // Cart.belongsTo(User, { foreignKey: 'user_id' })

  // Cart.hasMany(CartItem, {
  //     onDelete: "CASCADE",
  //     foreignKey: 'cart_id'
  // });
  // CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });

  // Product.hasMany(CartItem, {
  //     onDelete: "CASCADE",
  //     foreignKey: 'product_id'
  // });
  // CartItem.belongsTo(Product, { foreignKey: 'product_id' })

  User.hasMany(Product, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id'
  });
  Product.belongsTo(User, {
    foreignKey: 'user_id'
  });
}

export { syncTables }