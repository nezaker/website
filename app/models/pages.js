/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('pages', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		template: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		slug: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		extras: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		created_at: {
			type: DataTypes.TIME,
			allowNull: true
		},
		updated_at: {
			type: DataTypes.TIME,
			allowNull: true
		},
		deleted_at: {
			type: DataTypes.TIME,
			allowNull: true
		}
	}, {
		tableName: 'pages'
	});
};
