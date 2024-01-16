import { cn } from "../conexion/conexion";
import mongoose, { Schema, Types } from "mongoose";

cn

const postSchema = new mongoose.Schema({
    description:{
        type: String,
        require:true
    },
    img:{
        type:String,
        require:true,
        finish:{
            type:Number,
            required:true
        }
    },
    author:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"users"
       
    }

});


// creacion del modelo de post

const PostM = mongoose.model("post",postSchema);

export const getPost= async (description:string,img:string,finish:string,author:string)=>{
    const post= new PostM({
        description:description,
        img:img,
        finish:finish,
        author:new Types.ObjectId(author)

    });
    try{

        await post.save();
        const resultado = await PostM.aggregate(
            [
                {
                    $lookup:
                    {
                        from: "users",
                        localField:"author",
                        foreignField:"_id",
                        as:"userAuthor"
                    }
                },
                {$unwind: "$userAuthor"},
                {$project:{"userAuthor.password":0,"userAuthor._id":0}}
            ]
        );

        return resultado;
    }catch(err){
        console.log("error al enviar: " + err);
    }


};

