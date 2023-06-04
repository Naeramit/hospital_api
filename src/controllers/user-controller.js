const {  changeUserPassword, updateSelectedWorkspace , getUserById} = require('../services/user-service');
const {hash} = require('../services/bcrypt-service');
const { validateChangePassword } = require('../validators/user-validator');


exports.changeUserPassword = async (req, res, next) => {
    try {
        const input = validateChangePassword(req.body)

        hasedPassword = await hash(input.password)

        await changeUserPassword(req.user.id, hasedPassword)

        res.json({msg: `${req.user.username}'s password is changed`})
        
    } catch(err) {
        next(err)
    }
} 

exports.myWorkspace = async (req, res, next) => {
    try { 
        res.json({msg: req.user})
    } catch(err) {
        next(err)

    }
}


exports.updateSelectedWorkspace = async (req, res, next) => {
    try { 
        const {selectedWorkspace} = req.body
        const result = await updateSelectedWorkspace(req.user.id, selectedWorkspace)
        res.json({msg: `${result}`})

    } catch(err) {
        next(err)

    }
}