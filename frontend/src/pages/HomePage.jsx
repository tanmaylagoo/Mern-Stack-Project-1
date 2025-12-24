import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #000 60%, #00FF9D40 100%)",
      }}
    >
      <Navbar />

      {/* Rate limit warning */}
      {isRateLimited && (
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <RateLimitedUI />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Loading */}
        {loading && (
          <div className="text-center text-white/70 py-20">
            <span className="loading loading-spinner loading-lg text-[#00FF9D]" />
            <p className="mt-4 text-sm">Loading notes…</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && notes.length === 0 && !isRateLimited && (
          <NotesNotFound />
        )}

        {/* Notes grid */}
        {notes.length > 0 && !isRateLimited && (
          <div
            className="
              grid gap-6
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                setNotes={setNotes}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
