import { Link } from "react-router-dom"
import {PlusIcon} from "lucide-react"

const Navbar = () => {
  return (
    <header className="relative z-20 bg-base-300 border-b border-base-content/10 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)] text-white">
      <div className="mx-auto max-w-6xl p-4 ">
        <div className="flex items-center justify-between
        ">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">
            ThinkBoard
          </h1>
          <Link to="/create" className="flex items-center gap-2 rounded-lg border border-white px-4 py-2 text-white
             hover:bg-white/10 transition">
            <PlusIcon className="size-10" />
            <span>New Note</span>
          </Link>
        </div>
      </div>
    </header>
  )
}


export default Navbar
