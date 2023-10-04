import { DataTypes } from "sequelize";
import db from "../utils/database.js";

const Task = db.define("tasks", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement:true
    },
    title: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(100),
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }        
})

export default Task;