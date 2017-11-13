/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lesson', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		subject_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'subject',
				key: 'id'
			}
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER(6),
			allowNull: false
		},
		ordering: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			defaultValue: '0'
		},
		created_at: {
			type: DataTypes.TIME,
			allowNull: true
		},
		updated_at: {
			type: DataTypes.TIME,
			allowNull: true
		},
		semester: {
			type: DataTypes.INTEGER(6),
			allowNull: false
		}
	}, {
		tableName: 'lesson'
	});
};
