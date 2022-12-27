const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const todoschema=new Schema({
    todo:{
        type:"string",
        required:true
    }
})

const todo=mongoose.model("todo",todoschema)
module.exports=todo