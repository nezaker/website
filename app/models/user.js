/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	var User= sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: DataTypes.STRING(180),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(180),
			allowNull: false
		},
		status: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		last_login: {
			type: DataTypes.DATE,
			allowNull: false
		},
		first_name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		last_name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		birth_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		gender: {
			type: DataTypes.INTEGER(6),
			allowNull: false
		},
		photo_name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		address: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		city_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'city',
				key: 'id'
			}
		},
		phone_numbers: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		type: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		remember_token: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		created_at: {
			type: DataTypes.TIME,
			allowNull: true
		},
		updated_at: {
			type: DataTypes.TIME,
			allowNull: true
		},
		googleId: {
      		type: DataTypes.STRING,
      		unique: true
    	},

		facebookId: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		profile: {
			type: DataTypes.JSON,
			allowNull: true
		},
		tokens: {
			type: DataTypes.JSON,
			allowNull: true
		},
		role_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'role',
				key: 'id'
			}
		},
		accountType_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'account_type',
				key: 'id'
			}
		},
		family_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'family',
				key: 'id'
			}
		},
		grade_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'grade',
				key: 'id'
			}
		}
	}, {
		tableName: 'user'
	});
return User;
};
