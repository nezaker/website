/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sessions', {
		sid: {
			type: DataTypes.STRING(32),
			allowNull: false,
			primaryKey: true
		},
		expires: {
			type: DataTypes.DATE,
			allowNull: true
		},
		data: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		userId: {
			type: DataTypes.INTEGER(10),
			allowNull: true
		}
	}, {
		tableName: 'sessions'
	});
};
