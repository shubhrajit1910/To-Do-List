const express=require("express")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const ejs=require("ejs")
const Todo=require("./models/todo")

const app=express()
const port=3000

app.set("view engine","ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


const dburl="mongodb://localhost:27017/tododb"
mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("successfully connected");
    }
})
app.get("/",(req,res)=>{

    Todo.find()
    .then(result=>{
        res.render("index",{data:result})
        
    })
})

app.post("/",(req,res)=>{
    const todo=new Todo({
        todo:req.body.todovalue
    })
    todo.save()
    .then(result=>{
        res.redirect("/")
    })
})

app.delete("/:id",(req,res)=>{
    Todo.findByIdAndDelete(req.params.id)
    .then(result=>{
        console.log("result")
    })
})


app.listen(port,()=>{
    console.log("server is running")
})
