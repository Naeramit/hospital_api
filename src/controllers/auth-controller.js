const createError = require('../utils/create-error');
const { validateLogin, validateRegistry } = require('../validators/auth-validator');
const { getUserByUsername, createUser } = require('../services/user-service');
const {checkPassword, hash} = require('../services/bcrypt-service');
const {sign} = require('../services/token-service');



exports.registry = async (req, res, next) => {
  try {
    const input = validateRegistry(req.body);
    const  usernameExist = await getUserByUsername(input.username)

    if (usernameExist) {
      createError('username already in use', 400)
    }

    input.password =  await hash(input.password);

    const createdUser = await  createUser(input);

    const accessToken = sign({id: createdUser.id});

    res.status(200).json({accessToken})

  }catch(err){
    next(err)
  } 
}


  
exports.login = async (req, res, next) => {
  try {
    const input = validateLogin(req.body);

    const user = await getUserByUsername(input.username)
    if (!user) {
      createError('invalid credential', 400)
    }

    const correctedPassword = await checkPassword(input.password, user.password)
    if (!correctedPassword) {
      createError('invalid credential', 400)
    }

    const accessToken = sign({id: user.id})
    res.status(200).json({accessToken})

  } catch (err) {
    next(err);  
  }
};


exports.getUser = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
