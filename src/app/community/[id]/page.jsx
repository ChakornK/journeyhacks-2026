"use client";

import { Header } from "@/app/components/Header";
import { Portal } from "@/app/components/Portal";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessagesSquare, Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function CommunityPage() {
  const { id } = useParams();

  const [community, setCommunity] = useState({
    _id: "1",
    name: "Sample Community",
    description: "This is a sample community.",
    location: { lat: 0, lng: 0 },
  });
  const [confessions, setConfessions] = useState([
    {
      _id: "1",
      community_id: "1",
      content: "This is a sample confession.",
      created_at: "2024-01-01T00:00:00Z",
      likes: 67,
    },
    {
      _id: "2",
      community_id: "1",
      content: "This is another sample confession.",
      created_at: "2024-01-02T00:00:00Z",
      likes: 45,
    },
    {
      _id: "3",
      community_id: "1",
      content: "This is yet another sample confession.",
      created_at: "2024-01-03T00:00:00Z",
      likes: 32,
    },
  ]);
  // useEffect(() => {
  //   fetch(`/api/communities/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setConfessions(data.confessions);
  //       setCommunity(data.community);
  //     });
  // }, []);

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [confessionContent, setConfessionContent] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const handleCreateConfession = () => {
    if (!confessionContent) return alert("Please fill all fields.");
    setCreateLoading(true);
    fetch(`/api/communities/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: confessionContent,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setConfessions((prev) => [data.community, ...prev]);
      })
      .finally(() => {
        setCreateModalVisible(false);
        setConfessionContent("");
        setCreateLoading(false);
      });
  };

  return (
    <>
      <main className="h-dvh flex w-screen flex-col bg-black p-8 font-sans text-white">
        <Header />

        <div className="flex items-start justify-between">
          <div>
            <p className="text-2xl font-medium">{community.name}</p>
            <p className="text-sm text-neutral-400">{community.description}</p>
            <div className="mt-2 flex items-center gap-1 text-sm text-neutral-400">
              <MessagesSquare size={16} />
              <p className="">{confessions.length} confessions</p>
            </div>
          </div>

          <button
            className="flex cursor-pointer items-center gap-1 rounded-lg bg-emerald-400 px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-emerald-500"
            onClick={() => setCreateModalVisible(true)}
          >
            <Plus size={16} /> Post
          </button>
        </div>

        <div className="mt-4 flex flex-col items-stretch gap-2">
          {confessions.map(({ _id, content, created_at, likes, liked }) => (
            <div
              key={_id}
              className="flex flex-col gap-2 rounded-lg border border-neutral-800 bg-neutral-900 p-4"
            >
              <p className="font-serif">{content}</p>
              <div className="flex items-end justify-between">
                <button
                  className="-mb-1 -ml-1 flex cursor-pointer items-center gap-1 rounded-full px-2 py-1 text-sm hover:bg-neutral-800"
                  onClick={() => {
                    setConfessions(
                      confessions.map((confession) => {
                        if (confession._id === _id) {
                          const isLiked = confession.liked;
                          return {
                            ...confession,
                            liked: !isLiked,
                            likes: isLiked
                              ? confession.likes - 1
                              : confession.likes + 1,
                          };
                        }
                        return confession;
                      }),
                    );
                  }}
                >
                  <p className="text-red-500">
                    <Heart
                      size={16}
                      stroke={liked ? "currentColor" : "#fff"}
                      fill={liked ? "currentColor" : ""}
                    />
                  </p>{" "}
                  <p>{likes}</p>
                </button>

                <p className="text-xs tracking-tight text-neutral-400">
                  {formatDistanceToNow(new Date(created_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Portal>
        {createModalVisible && (
          <div
            className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/50 font-sans text-white"
            onClick={() => setCreateModalVisible(false)}
          >
            <div
              className="sm:w-md w-full border border-neutral-700 bg-neutral-900 sm:rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-neutral-700 px-4 py-3">
                <p className="text-lg font-semibold">Post a confession</p>
                <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-800">
                  <X size={20} onClick={() => setCreateModalVisible(false)} />
                </button>
              </div>

              <div className="flex flex-col gap-1 border-b border-neutral-700 p-4">
                <textarea
                  type="text"
                  className="rounded-lg border border-neutral-700 bg-black px-3 py-2 outline-none transition-colors focus:border-emerald-500"
                  placeholder="Enter your confession here..."
                  value={confessionContent}
                  onChange={(e) => setConfessionContent(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 p-4">
                <button
                  className="btn-secondary px-4 py-2"
                  onClick={() => {
                    setCreateModalVisible(false);
                    setConfessionContent("");
                  }}
                  disabled={createLoading}
                >
                  Cancel
                </button>
                <button
                  className="btn-primary px-4 py-2"
                  onClick={handleCreateConfession}
                  disabled={createLoading}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </Portal>
    </>
  );
}
