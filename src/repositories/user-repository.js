const { user, selectedWorkspace, workspace} = require('../models');


exports.createSelectedWorkspace = workspacesInput =>  selectedWorkspace.bulkCreate(workspacesInput)

exports.getUserById = id => user.findOne({
    where: {id},
    attributes: ["id", "username", "firstName" , "lastName", "gender", "role", "status"],
    include: {
        model: selectedWorkspace, 
        attributes: ["workspaceId"],
        include: {
            model: workspace,
            where: {status: 1},
            attributes: ["name"]
        }
    }
})


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







