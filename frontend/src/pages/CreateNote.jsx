import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-base-200 via-base-300 to-base-200 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]  text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          
          {/* Back */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-8 text-sm text-base-content/70 hover:text-base-content transition-colors"
          >
            <ArrowLeftIcon className="size-4" />
            Back to Notes
          </Link>

          {/* Card */}
          <div className="rounded-2xl bg-base-100 shadow-xl border border-base-300
          [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)] text-white">
            <div className="p-8">
              <h2 className="text-3xl font-semibold mb-6">
                Create New Note
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Give your note a title"
                    className="
                      w-full rounded-xl
                      input input-bordered
                      text-lg font-medium
                      focus:outline-none focus:ring-2 focus:ring-primary
                    "
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Content
                  </label>
                  <textarea
                    placeholder="Write your thoughts here..."
                    className="
                      w-full rounded-xl
                      textarea textarea-bordered
                      h-48 resize-none
                      leading-relaxed
                      focus:outline-none focus:ring-2 focus:ring-primary
                    "
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end pt-4 ">
                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      px-8 py-2 rounded-xl
                    bg-[#00FF9D] text-black font-semibold
                    hover:bg-[#00E68A]
                    transition
                    disabled:opacity-70
                    "
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateNote;
