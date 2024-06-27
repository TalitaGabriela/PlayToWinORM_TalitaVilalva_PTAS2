const conn = require ("../db/conn");
const { DataTypes } = require("sequelize");

const Usuario = conn.define("Usuario", {
    nickname: {
        type: DataTypes.VARCHAR,
        required: true,
    },
    nome: {
        type: DataTypes.VARCHAR,
        required: true,
    },
});

module.exports = Usuario;