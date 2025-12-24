import mongoose from "mongoose";

//create a schema
//create a model based off of that schema 

const noteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
},
    {timestamps: true}
);

const Note = mongoose.model("Note", noteSchema)

export default Note
