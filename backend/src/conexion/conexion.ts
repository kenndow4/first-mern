import mongoose from "mongoose";

export const cn = mongoose.connect("mongodb://127.0.0.1/redsocial").then(()=>console.log("conection successfull")).catch(()=>console.log("conection failed"));