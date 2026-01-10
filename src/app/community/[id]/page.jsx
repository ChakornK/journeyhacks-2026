"use client";

import { Header } from "@/app/components/Header";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessagesSquare, Plus } from "lucide-react";
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

  return (
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

        <button className="flex cursor-pointer items-center gap-1 rounded-lg bg-emerald-400 px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-emerald-500">
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
                {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
