const { user, selectedWorkspace, workspace} = require('../models');
const {Op} = require('sequelize')

exports.getUserByUsername = username =>  user.findOne( { where: { username: username } } )


exports.createUser = registryInput => user.create(registryInput);


exports.createSelectedWorkspace = workspacesInput =>  selectedWorkspace.bulkCreate(workspacesInput)

exports.removeSelectedWorkspace = workspacesInput =>  {
    for ( obj of workspacesInput) {
        selectedWorkspace.destroy({
            where: {
                userId: obj.userId,
                workspaceId: obj.workspaceId
            }})
    }
}

exports.checkSelectedUserWorkspace = userId => selectedWorkspace.findAll({
        where: {
            userId: userId 
        },
        attributes: ["workspaceId"]

    })


exports.getUserById = id => user.findOne({
    where: {id},
    attributes: ["id", "username", "firstName" , "lastName", "gender", "role", "status",  "workspaceId" ],
    include: {
        model: selectedWorkspace, 
        attributes: ["workspaceId"],
        include: {
            model: workspace,
            attributes: ["name"]
        }
    }
})



exports.changeUserPassword = (id, newPassword) => user.update(
    {password: newPassword},{where: {id}
})