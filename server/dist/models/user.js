import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
export class User extends Model {
    // Hash the password before saving the user
    async setPassword(password) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(password, saltRounds);
    }
}
export function UserFactory(sequelize) {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'users',
        sequelize,
        hooks: {
            // **Hash password on user creation**
            beforeCreate: async (user) => {
                await user.setPassword(user.password);
            },
            // **Hash password on user update if changed**
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    await user.setPassword(user.password);
                }
            },
        }
    });
    return User;
}