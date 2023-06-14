const userService = require('../services/user-service');
const {hash} = require('../services/bcrypt-service');
const { validateChangePassword } = require('../validators/user-validator');
const  createError = require('../utils/create-error')




exports.newPassword = async (req, res, next) => {
    try {
        const input = validateChangePassword(req.body)

        hasedPassword = await hash(input.password)

        await userService.newPassword(req.user.id, hasedPassword)

        res.json({action: "newPassword", result: true})
        
    } catch(err) {
        next(err)
    }
} 

exports.selectedWorkspace = async (req, res, next) => {
    try { 
        res.json(req.user.selectedWorkspaces)
    } catch(err) {
        next(err)
    }
}

exports.myWorkspace = async (req, res, next) => {
    try {
        const allWorkspace = await userService.getAllWorkspace()
        const result  = {"selected": req.user.selectedWorkspaces, "all": allWorkspace}
        res.json(result)
    } catch(err) {
        next(err)
    }
}

exports.updateMyWorkspace = async (req, res, next) => {
    try { 
        const {selectedWorkspace} = req.body
        const result = await userService.updateMyWorkspace(req.user.id, selectedWorkspace)
        res.json({action: "updateMyWorkspace", result: result})
    } catch(err) {
        next(err)
    }
}

exports.getAllTask =  async (req, res, next) => {
    try{
        const {workspaceId} = req.params
        const task = await userService.getAllTask(req.user.id, workspaceId)
        res.json(task)
    }catch(err){
        next(err)
    }
} 

exports.getHistory = async (req, res, next) => {
    try {
        const {consultationId} = req.params
        const consultHistory = await userService.getHistory(consultationId)
        res.json(consultHistory)
    } catch (err) {
        next(err)
    }
}

exports.updateHistory = async (req, res, next) => {
    try {
        const {consultationId} = req.params
        const result = await userService.getHistory(consultationId)
        if (result.length == 0) {
            createError("The consultation has  deleted", 403)
        }
        const attendUser = result[0].attendUserId 


        if (attendUser  != req.user.id && attendUser != null) {
            createError("The consultation has  attended by other", 403)
        }

        const {cc, pi, ph, pe, addition} = req.body 
        const payload  = {cc, pi, ph, pe, addition}

        if (attendUser == null){
            payload["attendUserId"] = req.user.id
            payload["receivedDatetime"] = Date.now()
        }

        const editResult = await userService.updateHistory(consultationId, payload)
        res.json(editResult[0] >= 1 ? {action: "updateHistory", result: true}: editResult)
    } catch (err){
        next(err)
    }
}

exports.unAttend =  async (req, res, next) => {
    try {
        const {consultationId} = req.params
        const result = await userService.getHistory(consultationId)

        if (result.length == 0) {
            createError("The consultation has  deleted", 403)
        }

        const attendUser = result[0].attendUserId 

        if (attendUser  != req.user.id && attendUser != null) {
            createError("The consultation has  attended by other", 403)
        }

        if (attendUser == null){
            res.json({action: "unAttend", result: null})
        }else{
            const editResult = await userService.updateHistory(consultationId, {attendUserId: null})
            res.json(editResult[0] >= 1 ? {action: "unAttend", result: true}: editResult) 
        }
    } catch(err){
        next(err)
    }
}


exports.getAllDiagnosis = async (req, res, next) => {
    try {
        const {consultationId} = req.params
        const result = await userService.checkConsultation(consultationId)
        if (result.length == 0) {
            createError("The consultation has  deleted", 403)
        }
        const diagnosisResult= await userService.getAllDiagnosis(consultationId)
        res.json(diagnosisResult)
    } catch (err) {
        next(err)
    }

}

exports.addDiagnosis = async (req, res, next) => {
    try {
        const {consultationId} = req.params

        const {diagnosis} = req.body

        const allDiagnosis = await userService.getAllDiagnosis(consultationId)

        const haveConsultationPD = allDiagnosis.some( c => c.type == 1)
        const havedDiagnosisiPD = diagnosis.some( c => c.type == 1)


        if ( haveConsultationPD && havedDiagnosisiPD){
            createError("The consultation must have only one Principle diagnosis", 403)
        }


        const history = await userService.getHistory(consultationId)

        if (history.length == 0) {
            createError("The consultation has  deleted", 403)
        }
        const attendUser = history[0].attendUserId 
        
        if (attendUser  != req.user.id && attendUser != null) {
            createError("The consultation is  created by other", 403)
        }

        if (attendUser == null){
            await userService.updateHistory(consultationId, {attendUserId: req.user.Id})
        }
        const payload = diagnosis.map( c => {return { consultationId: consultationId ,diagnosis: c.diagnosis, type: c.type, createdUserId: req.user.id }})
        const addResult = await userService.addDiagnosis(payload)
        res.json(addResult)
    } catch (err) {
        next(err)
    }
}


exports.updateDiagnosis = async (req, res, next) => {
    try {
        const {consultationId} = req.params

        const result = await userService.checkConsultation(consultationId)
        if (result.length == 0) {
            createError("The consultation has  deleted", 403)
        }

        const {diagnosisId} = req.params

        const diagnosisResult = await userService.getDiagnosis(diagnosisId)
        if (diagnosisResult.length == 0) {
            createError("The diagnosis has  deleted", 403)
        }
        const createdUser = diagnosisResult[0].createdUserId
    
        if (createdUser  != req.user.id ) {
            createError("The consultation is  created  by other", 403)
        }


        const { diagnosis, type} = req.body 
        const payload  = {diagnosis, type}

        const updateResult = await userService.updateDiagnosis(diagnosisId, payload)
        res.json(updateResult[0] >= 1 ? {action: "updateDiagnosis", result: true}: updateResult)
    } catch (err) {
        next(err)
    }
}


exports.deleteDiagnosis = async (req, res, next) => {
    try {
        const {consultationId} = req.params

        const result = await userService.checkConsultation(consultationId)
        if (result.length == 0) {
            createError("The consultation has  deleted", 403)
        }

        const {diagnosisId} = req.params

        const diagnosis = await userService.getDiagnosis(diagnosisId)
        if (diagnosis.length == 0) {
            createError("The diagnosis has  deleted", 403)
        }
        const createdUser = diagnosis[0].createdUserId
      
        if (createdUser  != req.user.id ) {
            createError("The consultation is  created  by other", 403)
        }

        const updateResult = await userService.updateDiagnosis(diagnosisId, {status: 0})
        res.json(updateResult[0] >= 1 ? {action: "deleteDiagnosis", result: true}: updateResult)
    } catch (err) {
        next(err)
    }
}

exports.getAllDrugOrder = async (req, res, next) => {
    try {
        const {consultationId} = req.params
        const result = await userService.checkConsultation(consultationId)
        if (result.length == 0) {
            createError("The consultation has  deleted", 403)
        }
        const allOrder = await userService.getAllDrugOrder(consultationId)
        const parseAllorder = JSON.parse(JSON.stringify(allOrder))
        const modifyAllOrder = parseAllorder.map(order => {return {...order, "type": 1}})
        res.json(modifyAllOrder)
    } catch (err) {
        next(err)
    }
}

exports.addDrugOrder = async (req, res, next) => {
    try {
        const {consultationId} = req.params
        const history = await userService.getHistory(consultationId)

        if (history.length == 0) {
            createError("The consultation has  deleted", 403)
        }
        const attendUser = history[0].attendUserId 
        
        if (attendUser  != req.user.id && attendUser != null) {
            createError("The consultation is  created  by other", 403)
        }

        if (attendUser == null){
            await userService.updateHistory(consultationId, {attendUserId: req.user.Id})
        }

        const {drugOrder} = req.body

        const payload = drugOrder.map( c => {return { consultationId: consultationId ,drugId: c.drugId, drugDescriptionId: c.drugDescriptionId, unitNumber: c.unitNumber, createdUserId: req.user.id, onset: c.onset }})

        const addResult = await userService.addDrugOrder(payload)

        const parseAddResult = JSON.parse(JSON.stringify(addResult))

        console.log(parseAddResult)

        const modifyAddResult = await userService.getDrugOrder(parseAddResult[0].id)
        res.json(modifyAddResult)
    } catch (err) {
        next(err)
    }
}



exports.updateDrugOrder = async (req, res, next) => {
    try {
        const {consultationId} = req.params

        const result = await userService.checkConsultation(consultationId)
        if (result.length == 0) {
            createError("The consultation has  deleted", 403)
        }

        const {drugorderId} = req.params

        const drugorder = await userService.getDrugOrder(drugorderId)
        if (drugorder.length == 0) {
            createError("The drugorder  has  deleted", 403)
        }
        const createdUser = drugorder[0].createdUserId
        const receivedUser = drugorder[0].receivedUserId
    
        if (createdUser  != req.user.id ) {
            createError("The drugorder is  created  by other", 403)
        }

        if (receivedUser != null){
            createError("The drugorder is  received", 403)
        }

        const { drugId, drugDescriptionId, unitNumber} = req.body 
        const payload  = {drugId, drugDescriptionId, unitNumber}

        const updateResult = await userService.updateDrugOrder(drugorderId, payload)
        res.json(updateResult[0] >= 1 ? {action: "updateDrugOrder", result: true}: updateResult)
    } catch (err) {
        next(err)
    }
}


exports.deleteDrugOrder = async (req, res, next) => {
    try {
        const {consultationId} = req.params

        const result = await userService.checkConsultation(consultationId)
        if (result.length == 0) {
            createError("The consultation has  deleted", 403)
        }

        const {drugorderId} = req.params

        const drugorder = await userService.getDrugOrder(drugorderId)
        if (drugorder.length == 0) {
            createError("The diagnosis has  deleted", 403)
        }
        const createdUser = drugorder[0].createdUserId
      
        if (createdUser  != req.user.id ) {
            createError("The consultation is  created  by other", 403)
        }

        const updateResult = await userService.updateDrugOrder(drugorderId, {status: 0})
        res.json(updateResult[0] >= 1 ? {action: "deleteDrugorder", result: true}: updateResult)
    } catch (err) {
        next(err)
    }
}
 
exports.discharge  =  async (req, res, next) => {
    try {
        const {consultationId} = req.params
        const result = await userService.getHistory(consultationId)

        if (result.length == 0) {
            createError("The consultation has  deleted", 403)
        }

        const attendUser = result[0].attendUserId 

        if (attendUser  != req.user.id && attendUser != null) {
            createError("The consultation has  attended by other", 403)
        }
        const editResult = await userService.updateHistory(consultationId, {attendUserId: req.user.id, nextProcess: 3 })
        res.json(editResult[0] >= 1 ? {action: "discharge", result: true}: editResult) 
    } catch(err){
        next(err)
    }
}