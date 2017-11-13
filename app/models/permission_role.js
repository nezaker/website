/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('permission_role', {
		permission_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'permission',
				key: 'id'
			}
		},
		role_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'role',
				key: 'id'
			}
		}
	}, {
		tableName: 'permission_role'
	});
};
