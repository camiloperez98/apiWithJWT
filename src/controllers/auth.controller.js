import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";

//Función para el registro de un usuario
export const signUp = async (req, res) => {
  const { username, email, password, roles } = req.body;
  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  //Si el usuario enviá la propiedad roles
  if (roles) {
    //Buscar si los roles del usuario si existen en la colección Roles
    const foundRoles = await Role.find({ name: { $in: roles } });

    /*
        Recorrer los objetos que encontrados en la consulta "foundRoles" y 
        solo tomar el _id para asignarlo a la propiedad roles del usuario
        */
    newUser.roles = foundRoles.map((role) => role._id);
  }
  //Si el usuario NO enviá la propiedad roles
  else {
    //Buscar el role "user"
    const role = await Role.findOne({ name: "user" });

    //Se le asignara el _id del role "user" por defecto
    newUser.roles = [role._id];
  }
  const savedUser = await newUser.save();

  //Vencimiento del token
  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400, //24 horas
  });

  res.status(200).json({ token });
  console.log(savedUser);
};


//Función para el ingreso de un usuario
export const signIn = async (req, res) => {

  //Buscar el usuario a través de su email
  const userFound = await User.findOne({ email: req.body.email }).populate("roles");
  
  //Validar si el email de user existe
  if (!userFound) {
    //Si no existe devuelve el mensaje de error
    return res.status(400).json({ message: "User not found" });
  }

  //Comparar el password registrado con el password que envia el usuario
  const validatePassword = await User.comparePassword(req.body.password, userFound.password);

  //Validar si los password coinciden
  if (!validatePassword) {
    //Si NO coinciden token sera nulo y arrojara un mensaje de error
    return res.status(401).json({token: null, message:'Invalid password'})
  }

  //Si coinciden genera el token
  const token = jwt.sign({id: userFound._id}, config.SECRET, {
    expiresIn: 86400 //24 Horas
  })
  res.json({token});
};
