module.exports = (sequelize, DataTypes) => {
    const  drugDescriptionSynonym = sequelize.define(
      'drugDescriptionSynonym' ,
      { 
        synonym: {
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


    drugDescriptionSynonym.associate = models => {
        
        drugDescriptionSynonym.belongsTo(
            models.drugDescription,{
            foreignKey: { 
              name: "drugDescriptionId",
              allowNull: false
            }
            }
        );
    }

    return drugDescriptionSynonym;
  };