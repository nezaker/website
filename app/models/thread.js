/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('thread', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		type: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		},
		related_entity_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		status: {
			type: DataTypes.INTEGER(1),
			allowNull: false
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
		tableName: 'thread'
	});
};
