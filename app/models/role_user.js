/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('role_user', {
		role_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'role',
				key: 'id'
			}
		},
		user_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'user',
				key: 'id'
			}
		}
	}, {
		tableName: 'role_user'
	});
};
