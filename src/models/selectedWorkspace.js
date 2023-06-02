module.exports = (sequelize, DataTypes) => {
    const  selectedWorkspace = sequelize.define(
      'selectedWorkspace',
      {},
      {
        underscored: true
      }
    );
    selectedWorkspace.associate = models => {
          selectedWorkspace.belongsTo(models.user,{
            foreignKey: {
              name: "userId",
              allowNull: false
            }
          });
          selectedWorkspace.belongsTo(models.workspace,{
            foreignKey: {
                name: "workspaceId",
                allowNull: false
            }
          });
    }



    return selectedWorkspace;
  };