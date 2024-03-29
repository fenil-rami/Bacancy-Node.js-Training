import sequelize from "../connect.js";
import { DataTypes } from "sequelize";

const Order = sequelize.define("Order", {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  }
}, {
  timestamps: false
})

export { Order };