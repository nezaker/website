/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('contact_us', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		phone_number: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		message: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'contact_us'
	});
};
