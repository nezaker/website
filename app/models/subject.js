/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('subject', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		grade_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'grade',
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
		},
		ordering: {
			type: DataTypes.INTEGER(6),
			allowNull: false,
			defaultValue: '0'
		},
		IconUrl: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'subject'
	});
};
