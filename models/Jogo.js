const conn = require ("../db/conn");
const { DataTypes } = require("sequelize");

const Jogo = conn.define("Jogo", {
    titulo: {
        type: DataTypes.VARCHAR,
        required: true,
    },
    descricao: {
        type: DataTypes.VARCHAR,
        required: true,
    },
    preco: {
        type: DataTypes.DOUBLE,
        required: true,
    },
});

module.exports = Jogo;