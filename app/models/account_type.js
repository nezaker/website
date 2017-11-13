/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('account_type', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		iconUrl: {
			type: DataTypes.TEXT,
			allowNull: true
		}

	}, {
		tableName: 'account_type'
	});
};
