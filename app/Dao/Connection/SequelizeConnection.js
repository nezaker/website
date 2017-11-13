var Sequelize = require('sequelize');

var sequelize = new Sequelize('nezaker', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    omitNull: true,
    underscored: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: false,
    storage: "./session.mysql"
}

);
exports.sequelize = sequelize;
//var models = require('sequelize-auto-import')(sequelize, path.join(__dirname, 'models'));
var models = require('sequelize-auto-import')(sequelize, '../../models');
exports.models = models;