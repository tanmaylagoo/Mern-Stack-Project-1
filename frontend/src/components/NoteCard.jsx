import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/util";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="
        group relative
        rounded-2xl
        bg-base-100
        border border-base-300
        border-t-4 border-t-[#00FF9D]
        p-5
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl
        hover:border-t-[#00E68A]
      "
    >
      {/* Title */}
      <h3 className="text-lg font-semibold text-base-content mb-2 line-clamp-1">
        {note.title}
      </h3>

      {/* Content */}
      <p className="text-sm text-base-content/70 leading-relaxed line-clamp-3">
        {note.content}
      </p>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs text-base-content/50">
          {formatDate(new Date(note.createdAt))}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
          <PenSquareIcon className="size-4 text-base-content/70" />

          <button
            onClick={(e) => handleDelete(e, note._id)}
            className="
              rounded-full p-1.5
              text-error
              hover:bg-error/10
              transition-colors
            "
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
