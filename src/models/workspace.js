module.exports = (sequelize, DataTypes) => {
    const workspace = sequelize.define(
      'workspace',
      { 
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
          }
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
            // '0:undefined 1:OPD 2:ER 3:IPD'
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

    workspace.associate = models => {

      workspace.hasMany(models.consultation,{
        foreignKey: {
          name: "workspaceId"
        },
        onDelete: 'RESTRICT'
      });

      workspace.hasMany(models.selectedWorkspace, {
        foreignKey: {
          name: "workspaceId",
          allowNull: false
        }
      });


    }
    return workspace;
  };