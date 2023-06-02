module.exports = (sequelize, DataTypes) => {
    const  drugSynonym = sequelize.define(
      'drugSynonym' ,
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


    drugSynonym.associate = models => {
        
        drugSynonym.belongsTo(
            models.drug,{
            foreignKey: { 
              name: "drugId",
              allowNull: false
            },
            onDelete: 'CASCADE'
            }
        );
    }

    return drugSynonym;
  };