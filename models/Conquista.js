const conn = require ("../db/conn");
const { DataTypes } = require("sequelize");

const Conquista = conn.define("Conquista", {
    titulo: {
        type: DataTypes.VARCHAR,
        required: true,
    },
    descricao: {
        type: DataTypes.VARCHAR,
        required: true,
    },
});

Conquista.belongsTo(Jogo);
Jogo.hasMany(Conquista);

module.exports = Conquista;