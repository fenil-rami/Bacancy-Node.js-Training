import { User } from "./models/user.model.js";
import { Product } from "./models/product.model.js";
import { Cart } from "./models/cart.model.js";
import { Order } from "./models/order.model.js";
import { Order_Product } from "./models/order_product.model.js";
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

  // Order-User relationship
  User.hasMany(Order, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id'
  })
  Order.belongsTo(User, {
    foreignKey: 'user_id'
  })

  // Order-Product relationship
  Order.hasMany(Order_Product, {
    onDelete: 'CASCADE',
    foreignKey: 'order_id'
  })
  Order_Product.belongsTo(Order, {
    foreignKey: 'order_id'
  })

  Product.hasMany(Order_Product, {
    onDelete: 'CASCADE',
    foreignKey: 'product_id'
  })
  Order_Product.belongsTo(Product, {
    foreignKey: 'product_id'
  })
}

export { syncTables }