module.exports = (sequelize, DataTypes) => {
    const  orderDrug = sequelize.define(
      'orderDrug',
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
        }
      },
      {
        underscored: true
      }
    );

    orderDrug.associate = models => {

        orderDrug.belongsTo(models.consultation, {
            foreignKey: {
              name: "consultationId",
              allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        orderDrug.belongsTo(models.drug, {
            foreignKey: {
            name: "drugId",
            allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        orderDrug.belongsTo( models.drugDescription,{
            foreignKey: {
                name: "drugDescriptionId",
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        orderDrug.belongsTo(models.user,{
            foreignKey: {
              name: "createdUserId",
              allowNull: false
            },
            onDelete: 'RESTRICT'
        });
      

        orderDrug.belongsTo(models.user, {
            foreignKey:{
                name: 'receivedUserId',
            },
            onDelete: 'RESTRICT'
        });
    }

    return orderDrug;
  };