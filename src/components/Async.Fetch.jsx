import { useFetchStore } from "../store/store"
import { useEffect, useState } from "react"
export default function AsyncFetch(){
    const [loading, setLoading]=useState(false)
    const addPosts = useFetchStore((state)=>state.getPostsAsync)
    async function handleClick(){
        setLoading(true)
        await addPosts()
        setLoading(false)
    }
    const posts = useFetchStore((state)=> state.posts)
    useEffect(()=>{
        console.log(posts)
    },[posts])
return (
    <div className="max-w-3xl mx-auto mt-6 space-y-4">
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
      >
        Load Async Posts
      </button>

      {loading && (
        <div className="text-gray-600 font-medium mt-2">Loading Posts...</div>
      )}

      <div className="space-y-4 mt-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 bg-white rounded-2xl shadow-md border border-gray-200"
          >
            <p className="font-bold text-lg mb-1">{post.title}</p>
            <p className="text-sm text-gray-500 mb-2">Posted by User: {post.id}</p>
            <p className="text-gray-700">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}