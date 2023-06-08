module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
      'user',
      { username:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
          }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validator: {
                notEmpty: true
            }
        },
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
            // '0:undefined 1:male 2:female'
            validate: {
                notEmpty: true
            }
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            // '0:undefined 1:Admin 2:Physician  3:Dentist 4.Nurse 5.Pharmacist 6.Medical_technologist 7.Radiological_technologist 8.Physiotherapist'
            validate: {
                notEmpty: true
            }
        },
        licenseNumber: {
            type: DataTypes.STRING,
            unique: true
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            // '0:inactive 1:new  2:active'
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
      },
      {
        underscored: true
      }
    );

    user.associate = models => {
    
    user.hasMany(models.consultation, {
        foreignKey: {
          name: "createdUserId",
          allowNull: false
        },
        onDelete: 'RESTRICT'
    });

    user.hasMany(models.consultation, {
        foreignKey: {
          name: "attendUserId"
        },
        onDelete: 'RESTRICT'
    });

    user.hasMany(models.drugOrder, {
      foreignKey: {
        name: "createdUserId",
        allowNull: false
      },
      onDelete: 'RESTRICT'
    });


    user.hasMany(models.drugOrder, {
      foreignKey: {
        name: "receivedUserId"
      },
      onDelete: 'RESTRICT'
    });

    user.hasMany(models.consultationDiagnosis, {
      foreignKey: {
        name: "createdUserId",
        allowNull: false
      },
      onDelete: 'RESTRICT'
    });

    user.hasMany(models.selectedWorkspace, {
      foreignKey: {
        name: "userId",
        allowNull: false
      }
    });


    }

    return user;
  };