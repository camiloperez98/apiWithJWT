import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/apidb")
  .then((db) => console.log("Db is conected"))
  .catch((error) => console.log(error));
