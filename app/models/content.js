/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('content', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		lesson_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'lesson',
				key: 'id'
			}
		},
		user_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'user',
				key: 'id'
			}
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER(6),
			allowNull: false
		},
		type: {
			type: DataTypes.INTEGER(6),
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
		youtube_video_id: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		material_url: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		thumbnail: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'content'
	});
};
