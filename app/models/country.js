/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('country', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		is_enabled: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		}
	}, {
		tableName: 'country'
	});
};
