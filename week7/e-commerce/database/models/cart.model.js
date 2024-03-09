import sequelize from "../connect.js";
import { DataTypes } from "sequelize";

const Cart = sequelize.define("Cart", {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
}, {
  timestamps: false
})

export { Cart };