import mongoose,{Document} from "mongoose";
// import { cn } from "./conexion/conexion";



// creando el esquema
// Define un esquema para tus datos
const EsquemaUser = new mongoose.Schema({
   name: {type:String, require:true, unique:true},
   password: {type:String, require:true, unique:true},
    
    // define otros campos según tus necesidades
  });
  interface IUser extends Document {
    name: string;
    password: string;
    // define otros campos según tus necesidades
  }
  
  // Crea un modelo a partir de tu esquema
  const TuModelo = mongoose.model<IUser>('users', EsquemaUser);

// traer los datos de ususarios

export const getData = async(name:string, password:string)=>{
  try {
      const data  = await TuModelo.find({name:name,password:password});
      if(data.length < 1){
        return {error:"The user doesnt exist"};

      }
     
      return data;
  } catch (error) {
      console.error("Ocurrió un error al obtener los datos:", error);
      // Aquí puedes manejar el error como mejor te parezca
      // Por ejemplo, podrías devolver un mensaje de error al usuario
      return { error: "The user doesnt exist" };
  }
};
