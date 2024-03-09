import { User } from "./models/user.model.js";
import { Product } from "./models/product.model.js";
import { Cart } from "./models/cart.model.js";
import sequelize from "./connect.js";

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

  // User-Product relationship
  User.hasMany(Product, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id'
  });
  Product.belongsTo(User, {
    foreignKey: 'user_id'
  });

  // User-Product-Cart relationship
  User.hasMany(Cart, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id'
  });
  Cart.belongsTo(User, {
    foreignKey: 'user_id'
  })

  Product.hasMany(Cart, {
    onDelete: 'CASCADE',
    foreignKey: 'product_id'
  })
  Cart.belongsTo(Product, {
    foreignKey: 'product_id'
  })
}

export { syncTables }