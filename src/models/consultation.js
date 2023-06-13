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
        },
        status: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
          allowNull: false,
          validate: {
              notEmpty: true
          }
          // '0: cancel 1: record
        },
        nextProcess: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false,
          validate: {
              notEmpty: true
          }
          // '0:pending 1:pass-task 2:admit 3:discharge 4.refer   
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

        consultation.hasMany(models.drugOrder, {
          foreignKey: {
            name: "consultationId",
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
        
        consultation.belongsTo(models.user, {
            foreignKey: {
              name: "createdUserId",
              allowNull: false
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