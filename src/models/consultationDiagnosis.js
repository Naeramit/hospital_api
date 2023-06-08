module.exports = (sequelize, DataTypes) => {
    const consultationDiagnosis = sequelize.define(
      'consultationDiagnosis',
      { 
        diagnosis: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }

        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
            // '1: principle diagnosis 2: comorbidity 3: complication 4: external cause'
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
      },
      {
        underscored: true
      }

    );

    consultationDiagnosis.associate = models => {
      consultationDiagnosis.belongsTo(models.user, {
        foreignKey: {
          name: "createdUserId",
          allowNull: false
        },
        onDelete: 'RESTRICT'
      });

      consultationDiagnosis.belongsTo(models.consultation, {
        foreignKey: {
          name: "consultationId",
          allowNull: false
        },
        onDelete: 'RESTRICT'
      });

    }

    return consultationDiagnosis;
  };