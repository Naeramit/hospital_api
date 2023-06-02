
module.exports = (sequelize, DataTypes) => {
    const patient = sequelize.define(
      'patient',
      { 
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
          }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
          }
        },
        gender: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            // '0:uncertain 1:male 2:female'
            validate: {
                notEmpty: true
            }
        },
        healthInsurance: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            // '0:none 1:UC 2:SSS 3:OFC'
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        thaiNationalId: {
            type: DataTypes.STRING(13),
            unique: true
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            // '0:death 1:life'
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        birthdate: {
            type: DataTypes.DATE
        },
        mobilePhone: {
            type: DataTypes.STRING,
            validate: {
                is: /^[0-9]{10}$/

            }
        }
      },
      {
        underscored: true
      }
    );

    patient.associate = models => {

        patient.hasMany(models.consultation, {
            foreignKey:{
                name: 'patientId',
                allowNull: false
            },
            onDelete: 'RESTRICT'
        });
    }

    return patient;
  };