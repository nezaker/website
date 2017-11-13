/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('family', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'user',
				key: 'id'
			}
		}
	}, {
		tableName: 'family'
	});
};
