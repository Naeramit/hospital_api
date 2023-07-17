module.exports = (sequelize, DataTypes) => {
    const  drug = sequelize.define(
      'drug',
      { 
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
          }
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
            // '0: not available   1: available'
        }, 
        costPerUnit: {
            type: DataTypes.DECIMAL(8, 2),
            defaultValue: 0,
            allowNull: false,
        }
      },
      {
        underscored: true
      }
    );
    drug.associate = models => {
      drug.hasMany(models.drugOrder, {
        foreignKey: {
          name: "drugId"
        },
        onDelete: 'RESTRICT'
      });

      drug.hasMany(models.drugSynonym, {
        foreignKey: {
          name: "drugId",
          allowNull: false
        },
        onDelete: 'CASCADE'
      });
    }



    return drug;
  };