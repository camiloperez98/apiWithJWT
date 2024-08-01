import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

//Función para verificar si se envia un token
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    //Validar el envio de la cabecera
    if (!token) {
      //Si NO se envio un token en la cabecera retorna el mensaje de error
      return res.status(403).json({ message: "No token provided" });
    }

    //Si se envio un token en la cabecera, verificar y extraer la información que contiene a traves del config.SECRET
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;

    //Consultar y traer la información del usuario a traves del Id relacionado en el token, excluyendo la contraseña
    const user = await User.findById(req.userId, { password: 0 });

    //Validar si el usuario que contiene el token existe
    if (!user) {
      //Si NO existe el usuario, devuelve un mensaje y finaliza la ejecución
      return res.status(404).json({ message: "No user found" });
    }
    //Si existe, continua con el proceso
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};



// Función para verificar si el usuario tiene el rol de "Moderador"
export const isModerator = async (req, res, next) => {
  // Busca al usuario en la base de datos usando el ID almacenado en req.userId (establecido por middleware previo)
  const user = await User.findById(req.userId);

  // Busca todos los roles asociados al usuario en la base de datos
  const roles = await Role.find({ _id: { $in: user.roles } });

  // Recorre cada rol del usuario
  for (let i = 0; i < roles.length; i++) {
    // Verifica si el nombre del rol es "Moderador"
    if (roles[i].name === "moderator") {
      // Si se encuentra el rol de "Moderador", continua con la ejecución
      next();
      return;
    }
  }
  // Si no se encuentra el rol de "Moderador", responde con un estado 403 y un mensaje de error
  return res.status(403).json({ message: "Require moderator role" });
};



// Función para verificar si el usuario tiene el rol de "Administrador"
export const isAdmin = async (req, res, next) => {
  // Busca al usuario en la base de datos usando el ID almacenado en req.userId
  const user = await User.findById(req.userId);

  // Busca todos los roles asociados al usuario
  const roles = await Role.find({ _id: { $in: user.roles } });

  // Recorre cada rol del usuario
  for (let i = 0; i < roles.length; i++) {
    // Verifica si el nombre del rol es "Administrador"
    if (roles[i].name === "admin") {
      // Si se encuentra el rol de "Administrador" continua con la ejecución
      next();
      return;
    }
  }
  // Si no se encuentra el rol de "Administrador", responde con un estado 403 y un mensaje de error
  return res.status(403).json({ message: "Require admin role" });
};

