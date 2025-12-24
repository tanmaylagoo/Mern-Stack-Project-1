import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const Note = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch {
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch {
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  /* 🔄 Loading Screen */
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-white"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #000 60%, #00FF9D40 100%)",
        }}
      >
        <LoaderIcon className="animate-spin size-10 text-[#00FF9D]" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #000 60%, #00FF9D40 100%)",
      }}
    >
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">

          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition"
            >
              <ArrowLeftIcon className="size-4" />
              Back to Notes
            </Link>

            <button
              onClick={handleDelete}
              className="
                inline-flex items-center gap-2
                px-4 py-2 rounded-xl
                border border-red-500/40 text-red-400
                hover:bg-red-500/10 hover:text-red-300
                transition
              "
            >
              <Trash2Icon className="size-4" />
              Delete
            </button>
          </div>

          {/* Card */}
          <div className="rounded-2xl bg-neutral-900/90 backdrop-blur border border-white/10 shadow-2xl">
            <div className="p-8 space-y-6">

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="
                    w-full rounded-xl px-4 py-3
                    bg-neutral-800 text-white text-lg font-medium
                    placeholder:text-white/40
                    border border-white/10
                    focus:outline-none focus:ring-2 focus:ring-[#00FF9D]
                  "
                  value={note.title}
                  onChange={(e) =>
                    setNote({ ...note, title: e.target.value })
                  }
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Content
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="
                    w-full rounded-xl px-4 py-3 h-48 resize-none
                    bg-neutral-800 text-white
                    placeholder:text-white/40
                    border border-white/10
                    leading-relaxed
                    focus:outline-none focus:ring-2 focus:ring-[#00FF9D]
                  "
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="
                    px-8 py-2 rounded-xl
                    bg-[#00FF9D] text-black font-semibold
                    hover:bg-[#00E68A]
                    transition
                    disabled:opacity-70
                  "
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Note;
