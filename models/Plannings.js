module.exports = (sequelize, DataTypes) => {
      const Plannings = sequelize.define(
            "Plannings",
            {
                  planning_id: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                  },
                  periode: {
                        type: DataTypes.STRING,
                        allowNull: false,
                  },
                  nom_employe: {
                        type: DataTypes.STRING,
                        allowNull: false,
                  },
                  fonction: {
                        type: DataTypes.STRING,
                        allowNull: false,
                  },
                  lundi: {
                        type: DataTypes.JSON,
                        allowNull: false,
                  },
                  mardi: {
                        type: DataTypes.JSON,
                        allowNull: false,
                  },
                  mercredi: {
                        type: DataTypes.JSON,
                        allowNull: false,
                  },
                  jeudi: {
                        type: DataTypes.JSON,
                        allowNull: false,
                  },
                  vendredi: {
                        type: DataTypes.JSON,
                        allowNull: false,
                  },
                  samedi: {
                        type: DataTypes.JSON,
                        allowNull: false,
                  },
                  dimanche: {
                        type: DataTypes.JSON,
                        allowNull: false,
                  },
                  total_horaires: {
                        type: DataTypes.JSON,
                        allowNull: false,
                  },
            },
            {
                  primarykey: true,
                  timestamps: true,
                  underscored: true,
            }
      );

      return Plannings;
};
