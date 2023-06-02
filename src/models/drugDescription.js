module.exports = (sequelize, DataTypes) => {
    const  drugDescription = sequelize.define(
      'drugDescription',
      { 
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
          }
        },
      },
      {
        underscored: true
      }
    );

    drugDescription.associate = models => {
      
      drugDescription.hasMany( models.drugDescriptionSynonym,{     
          foreignKey: { 
            name: "drugDescriptionId",
            allowNull: false 
          },
          onDelete: 'CASCADE'
        }
      );

      drugDescription.hasMany( models.orderDrug, {
        foreignKey: {
          name: "drugDescriptionId",
          allowNull: false
        },
        onDelete: 'RESTRICT'
      });
  

    }

    return drugDescription;
  };