const conn = require ("../db/conn");
const { DataTypes } = require("sequelize");

const Jogo = conn.define("Jogo", {
    titulo: {
        type: DataTypes.STRING,
        required: true,
    },
    preco: {
        type: DataTypes.STRING,
        required: true,
    },
});

module.exports = Jogo;