module.exports = (sequelize, DataTypes) => {
    const  drugOrder = sequelize.define(
      'drugOrder',
      { 
        receivedDatetime: {
            type: DataTypes.DATE,
        },
        unitNumber: {
            type: DataTypes.DECIMAL(6,2),
            allowNull: false,
            defaultValue: 0,
            validate: {
                notEmpty: true
            }
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
            validate: {
                notEmpty: true
            }
            // '0: cancel   1: record'
        },
        onset: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
            validate: {
                notEmpty: true
            }
            // '0: undefined   1: OPD/ER  2: After discharge 3: After admit '
        }
      },
      {
        underscored: true
      }
    );

    drugOrder.associate = models => {

        drugOrder.belongsTo(models.consultation, {
            foreignKey: {
              name: "consultationId",
              allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        drugOrder.belongsTo(models.drug, {
            foreignKey: {
            name: "drugId",
            allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        drugOrder.belongsTo( models.drugDescription,{
            foreignKey: {
                name: "drugDescriptionId",
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        drugOrder.belongsTo(models.user,{
            foreignKey: {
              name: "createdUserId",
              allowNull: false
            },
            onDelete: 'RESTRICT'
        });
      

        drugOrder.belongsTo(models.user, {
            foreignKey:{
                name: 'receivedUserId',
            },
            onDelete: 'RESTRICT'
        });
    }

    return drugOrder;
  };