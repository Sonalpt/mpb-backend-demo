module.exports = (sequelize, DataTypes) => {
      const Users = sequelize.define(
            "Users",
            {
                  username: {
                        type: DataTypes.STRING,
                        allowNull: false,
                        unique: true,
                  },
                  password: {
                        type: DataTypes.STRING,
                        allowNull: false,
                  },
                  complete_name: {
                        type: DataTypes.STRING,
                        allowNull: true,
                        unique: true,
                  },
                  email: {
                        type: DataTypes.STRING,
                        allowNull: false,
                        unique: true,
                  },
                  function: {
                        type: DataTypes.STRING,
                        allowNull: true,
                  },
                  isDirection: {
                        type: DataTypes.BOOLEAN,
                        defaultValue: false,
                  },
            },
            {
                  timestamps: false,
            }
      );

      return Users;
};
