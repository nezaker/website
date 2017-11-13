/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('comment', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		body: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		author_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'user',
				key: 'id'
			}
		},
		status: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		},
		thread_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'thread',
				key: 'id'
			}
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
		tableName: 'comment'
	});
};
