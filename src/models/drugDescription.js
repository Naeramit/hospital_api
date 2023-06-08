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
        status: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
          allowNull: false,
          validate: {
              notEmpty: true
          }
          // '0: not available   1: available'
        }
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

      drugDescription.hasMany( models.drugOrder, {
        foreignKey: {
          name: "drugDescriptionId",
          allowNull: false
        },
        onDelete: 'RESTRICT'
      });
  

    }

    return drugDescription;
  };