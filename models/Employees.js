module.exports = (sequelize, DataTypes) => {
      const Employees = sequelize.define(
            "Employees",
            {
                  nom_employee: {
                        type: DataTypes.STRING,
                        allowNull: false,
                        unique: true,
                  },
                  fonction: {
                        type: DataTypes.STRING,
                        allowNull: false,
                  },
            },
            {
                  timestamps: false,
            }
      );

      return Employees;
};
