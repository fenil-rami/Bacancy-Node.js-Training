import sequelize from "../connect.js";
import { DataTypes } from "sequelize";

const Product = sequelize.define("Product", {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: false
})

export { Product };