import express from "express"
import { getAllNotes, CreateNote, DeleteNote, UpdateNote, getNoteByID } from '../controllers/notesControllers.js'
const router = express.Router()


router.get('/',getAllNotes)

router.get('/:id',getNoteByID)


router.post('/',CreateNote )

router.put('/:id',UpdateNote)

router.delete('/:id',DeleteNote)

export default router



