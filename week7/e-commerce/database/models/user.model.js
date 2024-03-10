import sequelize from "../connect.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("User", {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM(["buyer", "seller"]),
    allowNull: false
  }
}, {
  timestamps: false
})

export { User };