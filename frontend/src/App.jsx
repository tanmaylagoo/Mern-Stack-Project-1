
import {Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateNote from "./pages/CreateNote";
import Note from "./pages/Note";
import toast from "react-hot-toast";
const App = () => {
  return (
    <div className="relative min-h-screen w-full">
      {/* Background gradient */}
      

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/Note/:id" element={<Note />} />
      </Routes>
    </div>
  )
}

export default App
