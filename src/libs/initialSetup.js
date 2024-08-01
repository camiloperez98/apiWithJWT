import Role from "../models/Role";

//Función para creal un Role
export const createRoles = async () => {
  //Buscar si ya existen roles en la colección
  const count = await Role.estimatedDocumentCount();

  try {
    //Si hay roles creados no ejecutara nada
    if (count > 0) return;

    //Si no existen roles entonces creará los siguientes
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};
