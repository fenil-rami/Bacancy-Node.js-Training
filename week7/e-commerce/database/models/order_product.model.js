import sequelize from "../connect.js";
import { DataTypes } from "sequelize";

const Order_Product = sequelize.define("Order_Product", {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  }
}, {
  timestamps: false
})

export { Order_Product };