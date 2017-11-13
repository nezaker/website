/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('permission', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true
		},
		created_at: {
			type: DataTypes.TIME,
			allowNull: true
		},
		updated_at: {
			type: DataTypes.TIME,
			allowNull: true
		}
	}, {
		tableName: 'permission'
	});
};
