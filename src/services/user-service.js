const {getUserByUsername, createUser, createSelectedWorkspace ,getUserById, changeUserPassword, checkSelectedUserWorkspace, removeSelectedWorkspace} = require('../repositories/user-repository')


exports.getUserByUsername =  username =>  getUserByUsername(username)


exports.createUser = async registryInput => {
    const createdUser  = await createUser(registryInput);
    createSelectedWorkspace([{userId: createdUser.id, workspaceId: 1}])
    return createdUser 
}

exports.updateSelectedWorkspace = async (userId, newSelectedWorkspace) => {
    const selectedUserWorkspace = await checkSelectedUserWorkspace(userId);
    const oldSelectedWorkspace = JSON.parse(JSON.stringify(selectedUserWorkspace)).map( obj => obj.workspaceId)
    const addWorkspace = newSelectedWorkspace.reduce( (a,c)=> {
        if (!oldSelectedWorkspace.includes(c)){
            a.push(c)
        }
        return a
    } , [])
    const removeWorkspace = oldSelectedWorkspace.reduce( (a,c)=> {
        if (!newSelectedWorkspace.includes(c)){
            a.push(c)
        }
        return a
    } , [])
    if (addWorkspace == 0 && removeWorkspace == 0) return "workspace is not changed"
    const addWorkspaceInput = addWorkspace.map( c => {return {userId: userId, workspaceId: c}})
    const removeWorkspaceInput = removeWorkspace.map(  c => {return {userId: userId, workspaceId: c}})

    if (addWorkspaceInput.length > 0) createSelectedWorkspace(addWorkspaceInput);
    
    if (removeWorkspaceInput.length > 0) removeSelectedWorkspace(removeWorkspaceInput);

    return "workspace is changed"

}

exports.getUserById = async id => {
    const Query = await getUserById(id);
    const user = JSON.parse(JSON.stringify(Query))
    const myWorkspace = user.selectedWorkspaces.map( c => {
        let result = {}
        result[c.workspaceId] = c.workspace.name 
        return result
    })
    user.selectedWorkspaces = myWorkspace 
    return user
}


exports.changeUserPassword = (id, newPassword) => changeUserPassword(id, newPassword) 