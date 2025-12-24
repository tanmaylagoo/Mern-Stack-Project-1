import Note from '../model/Note.js'


export async function getAllNotes(_,res){
  try {
    const notes = await Note.find().sort({createdAt: -1}); //latest shown first
    res.status(200).json(notes)
    
  } catch (error) {
    console.error("Error in getAllNotes method controller", error);
    
    res.status(500).json({message:"Internal Server Error"})
    
  }
}

export async function getNoteByID(req,res){
  try {
    const note = await Note.findById(req.params.id);
    if(!note) return res.status(404).json({message:"Note ID not found!"})

    res.status(200).json(note)
    
  } catch (error) {
    console.error("Error in getNoteByID method controller", error);
    
    res.status(500).json({message:"Internal Server Error"})
    
  }
}




export async function CreateNote(req, res) {
  try {
    const {title, content} = req.body
    const note= new Note({title, content})
    const savedNote= await note.save()
    res.status(201).json(savedNote)
    
    
  } catch (error) {
    console.error("Error in getAllNotes method controller", error);
    
    res.status(500).json({message:"Internal Server Error"})
    
  }
  
}


export async function UpdateNote(req,res) {
  try {
    const{title,content}= req.body
    const updatedNote=await Note.findByIdAndUpdate(req.params.id,{title, content}, {
      new: true,

    })

    if(!updatedNote) return res.status(404).json({message:"Error ID not found"})


    res.status(200).json(updatedNote)

    
  } catch (error) {
    console.error("Error in UpdateNote controller", error);
    res.status(500).json({message: "Internal server error"})
    
    
  }
  
}

export async function DeleteNote(req, res) {
  try {
    const deletedNote= await Note.findByIdAndDelete(req.params.id)
    if(!deletedNote) return res.status(404).json({message:"Note not found!"})
    res.status(200).json({message:"Note deleted successfully"})
    
  } catch (error) {
    console.error("Error in DeleteNote controller", error);
    res.status(500).json({message: "Internal server error"})
    
  }
  
}

