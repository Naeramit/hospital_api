const { user, workspace, consultation, patient, consultationDiagnosis, drugOrder} = require('../models');
const { Op } = require("sequelize");
const {createSelectedWorkspace ,getUserById, checkSelectedUserWorkspace,removeSelectedWorkspace} = require('../repositories/user-repository');


exports.createUser = async registryInput => {
    const createdUser  = await user.create(registryInput);
    createSelectedWorkspace([{userId: createdUser.id, workspaceId: 1}])
    return createdUser 
}

exports.getUserByUsername =  username =>  user.findOne({
    where:{
        username
    }}
)

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

exports.newPassword = (userId, newPassword) => user.update(
    {password: newPassword, status: 2},{
        where: {
            id: userId
        }
    }
)

exports.getAllWorkspace = () => workspace.findAll({
    where:{status: 1},
    attributes: ["id", "name", "type"]
})

exports.updateMyWorkspace = async (userId, newSelectedWorkspace) => {
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
    if (addWorkspace == 0 && removeWorkspace == 0) return null
    const addWorkspaceInput = addWorkspace.map( c => {return {userId: userId, workspaceId: c}})
    const removeWorkspaceInput = removeWorkspace.map(  c => {return {userId: userId, workspaceId: c}})

    if (addWorkspaceInput.length > 0) createSelectedWorkspace(addWorkspaceInput);
    
    if (removeWorkspaceInput.length > 0) removeSelectedWorkspace(removeWorkspaceInput);

    return true
}

exports.getAllTask= (userId, workspaceId) => consultation.findAll({
    where: {
        workspaceId: workspaceId,
        status: 1,
        [Op.or]: [
            { attendUserId: userId },
            { attendUserId: null }
        ]
    },
    attributes : ["id", "createdAt",  "attendUserId"  ],
    include: [{
        model: patient,
        attributes: ["id","firstName", "lastName", "gender"]
    }]
})


exports.checkConsultation = (consultationId) => consultation.findAll({
    where: {
        id: consultationId,
        status: 1
    },
    attributes : ["id"]

})

exports.getHistory = (consultationId) => consultation.findAll({
    where: {
        id: consultationId, 
        status:1
    },
    attributes : ["id","cc", "pi", "ph", "pe", "addition", "createdAt", "attendUserId", "createdUserId"],
    include: [{
        model: user, 
        attributes: ["firstName", "lastName", "gender", "role"]
    },
    {
        model: patient,
        attributes: ["id","firstName", "lastName", "gender", "healthInsurance", "birthdate" ]
    }],
})

exports.updateHistory = (consultationId, payload) => consultation.update(
    payload, {
        where: {
            id: consultationId
        }
    });

exports.getAllDiagnosis = (consultationId) => consultationDiagnosis.findAll({
    where: {
        consultationId: consultationId,
        status: 1
    },
    attributes : ["id", "diagnosis", "type"],
    order:["type"]
    });


exports.addDiagnosis = (payload) => consultationDiagnosis.bulkCreate(payload)


exports.getDiagnosis = (diagnosisId) => consultationDiagnosis.findAll({
    where: {
        id: diagnosisId,
        status: 1
    },
    attributes : ["id", "diagnosis", "type",  "createdUserId"]
    });



exports.updateDiagnosis = (diagnosisId, payload) => consultationDiagnosis.update(
    payload, {
        where: {
            id: diagnosisId,
            status:1 
        }
    });


exports.getAllDrugOrder = (consultationId) => drugOrder.findAll({
    where: {
        consultationId: consultationId,
        status: 1
    },
    attributes : ["id", "drugId", "drugDescriptionId", "unitNumber",  "receivedUserId"]
})

exports.addDrugOrder = (payload) => drugOrder.bulkCreate(payload)


exports.getDrugOrder = (drugorderId) => drugOrder.findAll({
    where: {
        id: drugorderId,
        status: 1
    },
    attributes : ["id", "drugId", "drugDescriptionId", "unitNumber",  "receivedUserId" ,"createdUserId"]
    });


exports.updateDrugOrder = (drugorderId, payload) => drugOrder.update(
    payload, {
        where: {
            id: drugorderId,
            status: 1
        }
    });
