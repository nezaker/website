/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('city', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		country_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'country',
				key: 'id'
			}
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		is_enabled: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'city'
	});
};
