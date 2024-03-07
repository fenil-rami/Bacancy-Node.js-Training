import { DataTypes } from "sequelize";
import sequelize from "../connect.js";

const User = sequelize.define("User", {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
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