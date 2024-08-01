import { ROLES } from "../models/Role";
import User from "../models/User";

//Función para verificar si existen los roles
export const checkRolesExisted = async (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} does not exist`,
        });
      }
    }
  }
  next();
};

//Función para verificar si un usuario ya existe
export const checkDuplicatedUser = async (req, res, next) => {
  //Buscar si existe un registro con el username igual al que envia el usuario
  const userName = await User.findOne({ username: req.body.username });

  //Si existe
  if (userName) {
    //Responde con un estado 400 y un mensaje de error
    return res.status(400).json({ message: "The username already exist" });
  }

  //Buscar si existe un registro con el email igual al que envia el usuario
  const email = await User.findOne({ email: req.body.email });

  //Si existe
  if (email) {
    //Responde con un estado 400 y un mensaje de error
    return res.status(400).json({ message: "The email already exist" });
  }

  //En caso de NO existir registros con el mismo username o email, continua la ejecucíon
  next();
};
