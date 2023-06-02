module.exports = (sequelize, DataTypes) => {
    const  consultation = sequelize.define(
      'consultation',
      { 
        cc: DataTypes.STRING,
        pi: DataTypes.TEXT,
        ph: DataTypes.TEXT,
        pe: DataTypes.TEXT,
        addition: DataTypes.TEXT,
        receivedDatetime: {
            type: DataTypes.DATE,
        }
      },
      {
        underscored: true
      }
    );

    consultation.associate = models => {

        consultation.hasMany(models.consultationDiagnosis, {
          foreignKey: {
            name: "consultationId",
            allowNull: false
          },
          onDelete: 'RESTRICT'
        });

        consultation.belongsTo(models.user, {
            foreignKey: {
              name: "createdUserId",
              allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        consultation.belongsTo(models.user, {
            foreignKey: {
            name: "attendUserId"
            },
            onDelete: 'RESTRICT'
        });

        consultation.belongsTo(models.workspace,{
            foreignKey: {
                name: "workspaceId",
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });

        consultation.belongsTo(models.patient, {
            foreignKey:{
                name: 'patientId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });


    }

    return consultation;
  };