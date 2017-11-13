/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('permission_user', {
		user_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'user',
				key: 'id'
			}
		},
		permission_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'permission',
				key: 'id'
			}
		}
	}, {
		tableName: 'permission_user'
	});
};
