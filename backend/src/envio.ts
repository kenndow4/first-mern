import express from "express";
import { getData } from ".";
import cors from "cors";
import { getPost } from "./post/post";
import multer from 'multer';
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());
app.use(cors());
app.use('/posts', express.static(path.join(__dirname, '../posts')));
app.use('/perfil', express.static(path.join(__dirname, '../perfil')));


// Comprueba si el directorio 'posts' existe
if (!fs.existsSync('./posts')) {
    // Si no existe, lo crea
    fs.mkdirSync('./posts');
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../posts/'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage });
app.use(upload.any());

app.post("/user", async(req: express.Request,res:express.Response)=>{
    const { name, password } = req.body;
    const user = await getData(name,password);
    res.json(user);
});

app.post("/post", async(req: express.Request,res:express.Response)=>{
    const {description, finish, author} = req.body;
    let img;
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        img = req.files[0];
        
        
    } else {
        console.log('No se envió ningún archivo');
        return res.status(400).json({ error: 'No se envió ningún archivo' });
    }
    console.log(author);
    console.log(img);
    // const post = await getPost(description,img,finish,author);
    const post = await getPost(description, img.filename, finish, author);
     res.json(post);
});

app.listen(8080,()=>{
    console.log("its running");
});
